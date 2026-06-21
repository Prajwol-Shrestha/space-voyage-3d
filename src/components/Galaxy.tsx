import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface GalaxyProps {
  count?: number;
  position?: [number, number, number];
}

export default function Galaxy({
  count = 4000,
  position = [0, 0, -700],
}: GalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);

    const branches = 2;
    const radius = 35;
    const spin = 1.5;

    // Define colors using Three.js Color objects for easy blending
    const colorCore = new THREE.Color("#ffe699"); // Hot golden core
    const colorEdge = new THREE.Color("#4682b4"); // Cool steel blue outer arms

    for (let i = 0; i < count; i++) {
      // Find the progress/distance ratio of this specific particle from the center (0 to 1)
      const r = Math.random() * radius;

      // Determine which spiral arm this particle belongs to
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      // Calculate twist: particles further out rotate more, creating the spiral effect
      const spinAngle = r * spin;

      // Add a touch of random scattering so the arms look organic rather than hard math lines
      const randomX =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;
      const randomY =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;
      const randomZ =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 4;

      // Trigonometry to wrap positions into the spiral coordinates
      const x = Math.cos(branchAngle + spinAngle) * r + randomX;
      const y = Math.sin(branchAngle + spinAngle) * r + randomY;
      const z = randomZ; // Keeps the galaxy flat like a disc, with slight thickness

      // Map positions straight into our flat 1D Float32Array space
      const i3 = i * 3;
      posArray[i3] = x;
      posArray[i3 + 1] = y;
      posArray[i3 + 2] = z;

      // 2. Color Interpolation: Mix from Core to Edge based on radius distance ratio
      const mixedColor = colorCore.clone().lerp(colorEdge, r / radius);
      colorArray[i3] = mixedColor.r;
      colorArray[i3 + 1] = mixedColor.g;
      colorArray[i3 + 2] = mixedColor.b;
    }

    return [posArray, colorArray];
  }, [count]);

  // 3. Render Loop: Rotate the entire galaxy majestically
  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slowly spin the galaxy disc around its center axis
      pointsRef.current.rotation.z += delta * 0.03;
    }
  });

  return (
    // Wrap it in a group so it aligns with our target coordinate along the Z highway
    <group position={position} rotation={[Math.PI / 3, 0, 0]}>
      <points ref={pointsRef}>
        {/* BufferGeometry holds our raw math arrays directly on the GPU memory */}
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>

        {/* PointsMaterial styles every vertex point into a soft glowing star square */}
        <pointsMaterial
          size={0.15}
          sizeAttenuation={true} // True = stars shrink when far away, grow as camera gets close
          vertexColors={true} // Instructs the shader to use our custom color arrays
          transparent={true}
          opacity={0.8}
          depthWrite={false} // Prevents star blocks from cutting ugly black boxes out of each other
          blending={THREE.AdditiveBlending} // Makes overlapping stars stack light brightness naturally
        />
      </points>
    </group>
  );
}
