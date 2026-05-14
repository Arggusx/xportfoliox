import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/DamagedHelmet.glb';

function LoadedModel() {
    const { scene } = useGLTF(MODEL_PATH);
    const modelRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!modelRef.current) return;
        modelRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 0.08;
    });

    return (
        <group ref={modelRef} scale={1.8}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload(MODEL_PATH);

function OrbitRing({
    radius,
    tubeRadius,
    color,
    speed,
    axis,
}: {
    radius: number;
    tubeRadius: number;
    color: string;
    speed: number;
    axis: 'x' | 'y' | 'z';
}) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.rotation[axis] = clock.getElapsedTime() * speed;
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, tubeRadius, 12, 64]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

function Particles({ count = 100 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const neonBlue = new THREE.Color('#00d4ff');
        const neonPink = new THREE.Color('#ff2d75');
        const neonPurple = new THREE.Color('#b44dff');
        const palette = [neonBlue, neonPink, neonPurple];

        for (let i = 0; i < count; i++) {
            const r = 3 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return [pos, col];
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

function OrbitingSpheres() {
    const groupRef = useRef<THREE.Group>(null);

    const spheres = useMemo(() => {
        const arr = [];
        const clrs = ['#00d4ff', '#ff2d75', '#b44dff', '#00d4ff', '#ff2d75'];
        for (let i = 0; i < 5; i++) {
            arr.push({
                angle: (i / 5) * Math.PI * 2,
                radius: 2.5 + Math.random() * 0.5,
                speed: 0.3 + Math.random() * 0.3,
                size: 0.06 + Math.random() * 0.06,
                color: clrs[i],
                yOffset: (Math.random() - 0.5) * 1.5,
            });
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.children.forEach((child, i) => {
            const s = spheres[i];
            child.position.x = Math.cos(s.angle + t * s.speed) * s.radius;
            child.position.z = Math.sin(s.angle + t * s.speed) * s.radius;
            child.position.y = s.yOffset + Math.sin(t * 0.5 + i) * 0.3;
        });
    });

    return (
        <group ref={groupRef}>
            {spheres.map((s, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[s.size, 8, 8]} />
                    <meshBasicMaterial color={s.color} />
                </mesh>
            ))}
        </group>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 4, 5]} intensity={1.0} color="#ffffff" />
            <pointLight position={[4, 3, 4]} intensity={0.8} color="#00d4ff" distance={15} decay={2} />
            <pointLight position={[-4, -2, 3]} intensity={0.5} color="#ff2d75" distance={15} decay={2} />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate
                autoRotateSpeed={1.2}
                minDistance={3}
                maxDistance={12}
                dampingFactor={0.05}
                enableDamping
            />
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <LoadedModel />
            </Float>
            <OrbitRing radius={2.8} tubeRadius={0.015} color="#ff2d75" speed={0.4} axis="x" />
            <OrbitRing radius={3.2} tubeRadius={0.012} color="#00d4ff" speed={-0.3} axis="y" />
            <OrbitRing radius={2.5} tubeRadius={0.01} color="#b44dff" speed={0.25} axis="z" />
            <OrbitingSpheres />
            <Particles count={100} />
        </>
    );
}

export default function ThreeScene() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                minHeight: '350px',
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
                    background:
                        'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{
                    background: 'transparent',
                    borderRadius: '50%',
                    position: 'relative',
                    zIndex: 1,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                }}
                dpr={1}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
