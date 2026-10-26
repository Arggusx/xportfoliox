import { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Em telas de toque, arrastar a cena impediria a rolagem da página.
const hasFinePointer =
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/* ===================== Código exibido na tela ===================== */

const CODE = [
    "// Hi, I'm Douglas. Let's build something!",
    'const developer = {',
    '  name: "Douglas Moreira",',
    '  role: "Front-end Developer",',
    '  stack: ["React", "TypeScript", "Tailwind"],',
    '  backend: ["Node.js", "PHP", "Laravel"],',
    '  coffee: Infinity,',
    '};',
    '',
    'function build(idea: string) {',
    '  return developer.stack.reduce(',
    '    (app, tool) => app.with(tool),',
    '    idea',
    '  );',
    '}',
    '',
    'export default build("your next project");',
];

const COLORS = {
    comment: '#64748b',
    string: '#a3e635',
    keyword: '#c084fc',
    number: '#fb923c',
    prop: '#38bdf8',
    func: '#facc15',
    ident: '#e2e8f0',
    punct: '#94a3b8',
};

type Token = { text: string; color: string };

const TOKEN_RE =
    /(\/\/.*$)|("[^"]*")|\b(const|function|return|export|default)\b|\b(Infinity|\d+)\b|([A-Za-z_]\w*)(?=\s*:)|([A-Za-z_]\w*)(?=\()|([A-Za-z_]\w*)|(\s+)|(.)/g;

function tokenize(line: string): Token[] {
    const tokens: Token[] = [];
    for (const m of line.matchAll(TOKEN_RE)) {
        const [text, comment, str, kw, num, prop, fn, ident] = m;
        const color = comment ? COLORS.comment
            : str ? COLORS.string
            : kw ? COLORS.keyword
            : num ? COLORS.number
            : prop ? COLORS.prop
            : fn ? COLORS.func
            : ident ? COLORS.ident
            : COLORS.punct;
        tokens.push({ text, color });
    }
    return tokens;
}

const TOKENS = CODE.map(tokenize);
const TOTAL_CHARS = CODE.reduce((n, l) => n + l.length, 0);

/* ===================== Texturas desenhadas em canvas ===================== */

const SCREEN_W = 1120;
const SCREEN_H = 720;
const MONO = "'Consolas', 'Courier New', monospace";

function drawEditor(ctx: CanvasRenderingContext2D, visibleChars: number, cursorOn: boolean) {
    // fundo
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, SCREEN_W, SCREEN_H);

    // barra de título + aba
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, SCREEN_W, 48);
    [['#f87171', 28], ['#facc15', 54], ['#4ade80', 80]].forEach(([c, x]) => {
        ctx.fillStyle = c as string;
        ctx.beginPath();
        ctx.arc(x as number, 24, 8, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(120, 8, 210, 40);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(120, 8, 210, 3);
    ctx.font = `20px ${MONO}`;
    ctx.fillStyle = '#e2e8f0';
    ctx.textBaseline = 'middle';
    ctx.fillText('developer.ts', 140, 30);

    // código
    const top = 84;
    const lineH = 32;
    const left = 76;
    ctx.font = `22px ${MONO}`;
    const charW = ctx.measureText('M').width;

    let remaining = visibleChars;
    let cursorX = left;
    let cursorY = top;

    for (let i = 0; i < TOKENS.length; i++) {
        const y = top + i * lineH;

        ctx.fillStyle = '#475569';
        ctx.textAlign = 'right';
        ctx.fillText(String(i + 1), left - 24, y);
        ctx.textAlign = 'left';

        let x = left;
        for (const tk of TOKENS[i]) {
            if (remaining <= 0) break;
            const shown = tk.text.slice(0, remaining);
            ctx.fillStyle = tk.color;
            ctx.fillText(shown, x, y);
            x += shown.length * charW;
            remaining -= shown.length;
        }
        cursorX = x;
        cursorY = y;
        if (remaining <= 0) break;
    }

    if (cursorOn) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(cursorX + 1, cursorY - 13, 3, 26);
    }

    // barra de status
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(0, SCREEN_H - 34, SCREEN_W, 34);
    ctx.font = `18px ${MONO}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('main', 20, SCREEN_H - 17);
    ctx.textAlign = 'right';
    ctx.fillText('TypeScript   UTF-8   Prettier', SCREEN_W - 20, SCREEN_H - 17);
    ctx.textAlign = 'left';
}

function makeCanvas(w: number, h: number) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return [canvas, canvas.getContext('2d')!] as const;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
}

function makeKeyboardTexture() {
    const [canvas, ctx] = makeCanvas(1024, 420);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 1024, 420);

    const rows = [14, 14, 13, 12];
    const keyH = 62;
    const gap = 10;
    rows.forEach((count, r) => {
        const keyW = (1024 - 40 - gap * (count - 1)) / count;
        for (let k = 0; k < count; k++) {
            roundRect(ctx, 20 + k * (keyW + gap), 20 + r * (keyH + gap), keyW, keyH, 8);
            ctx.fillStyle = '#0f172a';
            ctx.fill();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });
    // barra de espaço
    roundRect(ctx, 300, 20 + 4 * (keyH + gap), 424, keyH, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.55)';
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
}

function makeGlyphTexture(text: string, color: string, size = 256, fontPx = 120) {
    const [canvas, ctx] = makeCanvas(size, size);
    ctx.font = `bold ${fontPx}px ${MONO}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 24;
    ctx.fillStyle = color;
    ctx.fillText(text, size / 2, size / 2);
    ctx.shadowBlur = 8;
    ctx.fillText(text, size / 2, size / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

/* ===================== Notebook ===================== */

const BASE_W = 3;
const BASE_D = 2;
const BASE_H = 0.12;
const LID_H = 0.07;
const OPEN_ANGLE = THREE.MathUtils.degToRad(108);

function Laptop() {
    const groupRef = useRef<THREE.Group>(null);

    const screen = useMemo(() => {
        const [canvas, ctx] = makeCanvas(SCREEN_W, SCREEN_H);
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        return { ctx, texture };
    }, []);
    const keyboard = useMemo(makeKeyboardTexture, []);

    useEffect(() => () => {
        screen.texture.dispose();
        keyboard.dispose();
    }, [screen, keyboard]);

    const typing = useRef({ chars: prefersReducedMotion ? TOTAL_CHARS : 0, hold: 0, lastDrawn: -1, lastCursor: false });

    useFrame(({ clock }, delta) => {
        const t = clock.getElapsedTime();
        const state = typing.current;

        if (!prefersReducedMotion) {
            if (state.chars < TOTAL_CHARS) {
                state.chars = Math.min(TOTAL_CHARS, state.chars + delta * 38);
            } else {
                state.hold += delta;
                if (state.hold > 4) {
                    state.chars = 0;
                    state.hold = 0;
                }
            }
            if (groupRef.current) groupRef.current.rotation.y = -0.25 + Math.sin(t * 0.35) * 0.18;
        }

        const chars = Math.floor(state.chars);
        const cursorOn = Math.floor(t * 2) % 2 === 0;
        if (chars !== state.lastDrawn || cursorOn !== state.lastCursor) {
            drawEditor(screen.ctx, chars, cursorOn);
            screen.texture.needsUpdate = true;
            state.lastDrawn = chars;
            state.lastCursor = cursorOn;
        }
    });

    const shell = <meshStandardMaterial color="#334155" metalness={0.35} roughness={0.45} />;

    return (
        <group ref={groupRef} position={[0, -1.0, 0.3]} rotation={[0.08, -0.25, 0]} scale={1.15}>
            {/* base */}
            <RoundedBox args={[BASE_W, BASE_H, BASE_D]} radius={0.05} smoothness={4}>
                {shell}
            </RoundedBox>
            {/* faixa neon na frente da base */}
            <mesh position={[0, 0, BASE_D / 2 + 0.001]}>
                <planeGeometry args={[BASE_W * 0.35, 0.015]} />
                <meshBasicMaterial color="#38bdf8" toneMapped={false} />
            </mesh>
            {/* teclado */}
            <mesh position={[0, BASE_H / 2 + 0.002, -0.28]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[2.6, 1.07]} />
                <meshStandardMaterial map={keyboard} emissive="#38bdf8" emissiveIntensity={0.08} emissiveMap={keyboard} roughness={0.7} />
            </mesh>
            {/* trackpad */}
            <mesh position={[0, BASE_H / 2 + 0.002, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.95, 0.55]} />
                <meshStandardMaterial color="#1e293b" roughness={0.3} />
            </mesh>

            {/* tampa: pivô na dobradiça (borda de trás da base) */}
            <group position={[0, BASE_H / 2, -BASE_D / 2]} rotation={[-OPEN_ANGLE, 0, 0]}>
                <RoundedBox args={[BASE_W, LID_H, BASE_D]} radius={0.025} smoothness={4} position={[0, LID_H / 2, BASE_D / 2]}>
                    {shell}
                </RoundedBox>
                {/* tela (lado de dentro) */}
                <mesh position={[0, -0.006, BASE_D / 2]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[2.78, 1.79]} />
                    <meshBasicMaterial map={screen.texture} toneMapped={false} />
                </mesh>
            </group>

            {/* luz da tela iluminando o teclado */}
            <pointLight position={[0, 0.9, 0.2]} intensity={2.2} color="#38bdf8" distance={4} decay={2} />
        </group>
    );
}

/* ===================== Símbolos flutuantes ===================== */

// Posições fixas em volta do notebook (nunca na frente da tela); só flutuam.
const GLYPHS: { text: string; color: string; pos: [number, number, number]; scale: number }[] = [
    { text: '</>', color: '#38bdf8', pos: [2.05, 0.35, -0.4], scale: 0.7 },
    { text: '{ }', color: '#ec4899', pos: [-2.0, 0.9, -0.6], scale: 0.65 },
    { text: '=>', color: '#a855f7', pos: [-2.15, -0.35, 0.2], scale: 0.55 },
    { text: 'TS', color: '#3178c6', pos: [1.75, 1.35, -0.8], scale: 0.5 },
    { text: '( )', color: '#facc15', pos: [1.9, -0.85, 0.4], scale: 0.5 },
    { text: '#', color: '#22d3ee', pos: [-1.3, 1.75, -1.0], scale: 0.45 },
];

function FloatingGlyphs() {
    const groupRef = useRef<THREE.Group>(null);

    const items = useMemo(
        () => GLYPHS.map((g) => ({ ...g, texture: makeGlyphTexture(g.text, g.color) })),
        []
    );

    useEffect(() => () => items.forEach((it) => it.texture.dispose()), [items]);

    useFrame(({ clock }) => {
        if (!groupRef.current || prefersReducedMotion) return;
        const t = clock.getElapsedTime();
        groupRef.current.children.forEach((child, i) => {
            const [x, y, z] = items[i].pos;
            child.position.set(x + Math.cos(t * 0.5 + i) * 0.06, y + Math.sin(t * 0.9 + i * 1.7) * 0.15, z);
        });
    });

    return (
        <group ref={groupRef}>
            {items.map((s, i) => (
                <sprite
                    key={i}
                    scale={[s.scale, s.scale, s.scale]}
                    position={s.pos}
                >
                    <spriteMaterial map={s.texture} transparent depthWrite={false} opacity={0.9} />
                </sprite>
            ))}
        </group>
    );
}

function Particles({ count = 120 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const palette = ['#38bdf8', '#ec4899', '#a855f7'].map((c) => new THREE.Color(c));

        for (let i = 0; i < count; i++) {
            const r = 2.5 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            const c = palette[i % palette.length];
            col.set([c.r, c.g, c.b], i * 3);
        }
        return [pos, col];
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current || prefersReducedMotion) return;
        ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} />
        </points>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 4]} intensity={1.6} />
            <pointLight position={[-4, 1, 3]} intensity={6} color="#ec4899" distance={12} decay={2} />
            <pointLight position={[4, -1, 3]} intensity={6} color="#a855f7" distance={12} decay={2} />

            <OrbitControls
                enabled={hasFinePointer}
                enablePan={false}
                enableZoom={false}
                enableDamping
                dampingFactor={0.05}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.9}
                minAzimuthAngle={-Math.PI / 3}
                maxAzimuthAngle={Math.PI / 3}
            />
            <Float speed={prefersReducedMotion ? 0 : 1.6} rotationIntensity={0.08} floatIntensity={0.25}>
                <Laptop />
            </Float>
            <FloatingGlyphs />
            <Particles />
        </>
    );
}

export default function ThreeScene() {
    return (
        <div
            role="img"
            aria-label="3D laptop showing code being typed"
            style={{
                width: '100%',
                height: '100%',
                minHeight: '280px',
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <Canvas
                camera={{ position: [0, 0.9, 5.4], fov: 50 }}
                style={{
                    background: 'transparent',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 1,
                }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
