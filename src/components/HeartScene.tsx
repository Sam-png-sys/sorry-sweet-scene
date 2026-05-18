import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Heart() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      ref.current.scale.set(s, s, s);
    }
  });

  // Build heart shape
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x + 0.5, y + 0.5);
  shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
  shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
  shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
  shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
  shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
  shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

  const extrudeSettings = { depth: 0.5, bevelEnabled: true, bevelSegments: 8, steps: 2, bevelSize: 0.15, bevelThickness: 0.15, curveSegments: 32 };

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={[-0.5, -1, 0]} scale={1}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <MeshDistortMaterial color="#ff3b6b" emissive="#ff5577" emissiveIntensity={0.4} roughness={0.15} metalness={0.3} distort={0.2} speed={2} />
      </mesh>
    </Float>
  );
}

export default function HeartScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffd6e0" />
        <pointLight position={[-5, -3, 2]} intensity={1} color="#ff6b9d" />
        <Heart />
        <Sparkles count={80} scale={8} size={3} speed={0.4} color="#ffb3c8" />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
