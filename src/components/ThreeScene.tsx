import { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_PATH = '/models/RetroBonnie.gltf';
const TEXTURE_PATH = '/models/BonnieTexture.png';

function LoadedModel() {
    const { scene } = useGLTF(MODEL_PATH);
    const texture = useTexture(TEXTURE_PATH);
    const modelRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Object3D | null>(null);
    const leftArmRef = useRef<THREE.Object3D | null>(null);
    const initialRotRight = useRef<number>(0);
    const initialRotLeft = useRef<number>(0);

    useEffect(() => {
        if (scene && texture) {
            texture.flipY = false; // GLTF exige flipY = false
            texture.colorSpace = THREE.SRGBColorSpace;
            
            scene.traverse((child) => {
                const mesh = child as THREE.Mesh;
                if (mesh.isMesh) {
                    mesh.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        color: new THREE.Color('#ffffff'),
                        metalness: 0.6,
                        roughness: 0.4,
                    });
                }
            });

            rightArmRef.current = scene.getObjectByName('Lowerarm.R') || scene.getObjectByName('Upperarm.R') || null;
            leftArmRef.current = scene.getObjectByName('Lowerarm.L') || scene.getObjectByName('Upperarm.L') || null;

            if (rightArmRef.current) initialRotRight.current = rightArmRef.current.rotation.x;
            if (leftArmRef.current) initialRotLeft.current = leftArmRef.current.rotation.x;
        }
    }, [scene, texture]);

    useFrame(({ clock }) => {
        if (!modelRef.current) return;
        const t = clock.getElapsedTime();
        modelRef.current.position.y = -1 + Math.sin(t * 0.8) * 0.08;

        if (rightArmRef.current) {
            rightArmRef.current.rotation.x = initialRotRight.current + Math.sin(t * 2) * 0.5;
        }
        if (leftArmRef.current) {
            leftArmRef.current.rotation.x = initialRotLeft.current + Math.sin(t * 2 + Math.PI) * 0.5;
        }
    });

    return (
        <group ref={modelRef} scale={0.15} position={[0, -1, 0]}>
            <primitive object={scene} />
        </group>
    );
}

useGLTF.preload(MODEL_PATH);
useTexture.preload(TEXTURE_PATH);

function FNAFParticles({ count = 150 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const bloodRed = new THREE.Color('#8b0000');
        const darkPurple = new THREE.Color('#4a0072');
        const staticGray = new THREE.Color('#666666');
        const palette = [bloodRed, darkPurple, staticGray];

        for (let i = 0; i < count; i++) {
            const r = 2 + Math.random() * 6;
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
        ref.current.rotation.y = clock.getElapsedTime() * 0.05;
        if (Math.random() > 0.95) {
            ref.current.position.x = (Math.random() - 0.5) * 0.1;
        } else {
            ref.current.position.x = 0;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

function FloatingPizzas() {
    const groupRef = useRef<THREE.Group>(null);
    const items = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => ({
            angle: (i / 5) * Math.PI * 2,
            radius: 2.5 + Math.random() * 1.5,
            speed: 0.15 + Math.random() * 0.15,
            size: 0.2 + Math.random() * 0.15,
            yOffset: (Math.random() - 0.5) * 2,
            rotSpeedX: Math.random() * 2,
            rotSpeedY: Math.random() * 2,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.children.forEach((child, i) => {
            const s = items[i];
            child.position.x = Math.cos(s.angle + t * s.speed) * s.radius;
            child.position.z = Math.sin(s.angle + t * s.speed) * s.radius;
            child.position.y = s.yOffset + Math.sin(t * 0.8 + i) * 0.4;
            child.rotation.x += 0.01 * s.rotSpeedX;
            child.rotation.y += 0.01 * s.rotSpeedY;
        });
    });

    return (
        <group ref={groupRef}>
            {items.map((s, i) => (
                <mesh key={i}>
                    <cylinderGeometry args={[s.size, s.size, 0.03, 16]} />
                    <meshStandardMaterial color="#fca311" roughness={0.6} />
                </mesh>
            ))}
        </group>
    );
}

function FloatingCheckers() {
    const groupRef = useRef<THREE.Group>(null);
    const items = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            angle: (i / 6) * Math.PI * 2,
            radius: 3 + Math.random() * 1.5,
            speed: -0.1 - Math.random() * 0.15,
            size: 0.15 + Math.random() * 0.15,
            yOffset: (Math.random() - 0.5) * 3,
            rotSpeed: Math.random() * 1.5,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.children.forEach((child, i) => {
            const s = items[i];
            child.position.x = Math.cos(s.angle + t * s.speed) * s.radius;
            child.position.z = Math.sin(s.angle + t * s.speed) * s.radius;
            child.position.y = s.yOffset + Math.cos(t * 0.5 + i) * 0.5;
            child.rotation.x += 0.01 * s.rotSpeed;
            child.rotation.z += 0.01 * s.rotSpeed;
        });
    });

    return (
        <group ref={groupRef}>
            {items.map((s, i) => (
                <mesh key={i}>
                    <boxGeometry args={[s.size, s.size, s.size]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#111111' : '#eeeeee'} roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

function Scene() {
    return (
        <>
            <Environment preset="dawn" />

            <ambientLight intensity={0.2} color="#4a0072" />
            <directionalLight position={[3, 4, 5]} intensity={0.6} color="#ffffff" />
            
            <pointLight position={[4, 3, 4]} intensity={1.5} color="#8b0000" distance={15} decay={2} />
            <pointLight position={[-4, -2, 3]} intensity={1.2} color="#4a0072" distance={15} decay={2} />
            
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate
                autoRotateSpeed={0.8}
                minDistance={2}
                maxDistance={15}
                dampingFactor={0.05}
                enableDamping
            />
            <Float speed={2.0} rotationIntensity={0.1} floatIntensity={0.2}>
                <LoadedModel />
            </Float>
            <FloatingPizzas />
            <FloatingCheckers />
            <FNAFParticles count={150} />
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
                        'radial-gradient(circle, rgba(74,0,114,0.15) 0%, transparent 70%)',
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
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}