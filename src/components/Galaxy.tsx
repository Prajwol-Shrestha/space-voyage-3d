import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";


function createStarSprite(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(255, 240, 200, 0.6)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}

interface GalaxyProps {
  count?: number;
  position?: [number, number, number];
}

export default function Galaxy({
  count = 4000,
  position = [0, 0, -700],
}: GalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const sprite = useMemo(() => createStarSprite(), []);

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const branches = 2;
    const radius = 35;
    const spin = 1.5;

    const colorCore = new THREE.Color("#ffe699");
    const colorEdge = new THREE.Color("#4682b4");

    for (let i = 0; i < count; i++) {
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;
      const randomY =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;
      const randomZ =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;

      const i3 = i * 3;
      posArray[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      posArray[i3 + 1] = Math.sin(branchAngle + spinAngle) * r + randomY;
      posArray[i3 + 2] = randomZ;

      const mixedColor = colorCore.clone().lerp(colorEdge, r / radius);
      colorArray[i3] = mixedColor.r;
      colorArray[i3 + 1] = mixedColor.g;
      colorArray[i3 + 2] = mixedColor.b;
    }

    return [posArray, colorArray];
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <group position={position} rotation={[Math.PI / 3, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          map={sprite}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          alphaTest={0.001}
        />
      </points>
    </group>
  );
}
