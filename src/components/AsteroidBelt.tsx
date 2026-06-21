import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface AsteroidBeltProps {
  position?: [number, number, number];
  count?: number;
}

export default function AsteroidBelt({
  position = [0, 0, -220],
  count = 320,
}: AsteroidBeltProps) {
  const groupRef = useRef<THREE.Group>(null);

  const rockTexture = useTexture({
    map: "/textures/asteroid/rock_color.jpg",
    normalMap: "/textures/asteroid/rock_normalGL.jpg",
    roughnessMap: "/textures/asteroid/rock_roughness.jpg",
    aoMap: "/textures/asteroid/rock_ambientOcclusion.jpg",
  });

  const asteroids = useMemo(() => {
    return Array.from({ length: count }, () => {
      const radius = 8 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;

      const yScatter = (Math.random() - 0.5) * 2.5;

      const x = Math.cos(angle) * radius;
      const y = yScatter;
      const z = Math.sin(angle) * radius;

      const size = 0.04 + Math.pow(Math.random(), 4) * 0.65;
      const rotX = Math.random() * Math.PI * 2;
      const rotY = Math.random() * Math.PI * 2;
      const rotZ = Math.random() * Math.PI * 2;

      const spinSpeed = (Math.random() - 0.5) * 0.8;

      return {
        position: [x, y, z] as [number, number, number],
        size,
        rotX,
        rotY,
        rotZ,
        spinSpeed,
      };
    });
  }, [count]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.012;
    }
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += delta * asteroids[i].spinSpeed;
        mesh.rotation.y += delta * asteroids[i].spinSpeed * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {asteroids.map((asteroid, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={asteroid.position}
          rotation={[asteroid.rotX, asteroid.rotY, asteroid.rotZ]}
        >
          <dodecahedronGeometry args={[asteroid.size, 0]} />
          <meshStandardMaterial
            {...rockTexture}
            normalScale={new THREE.Vector2(1.5, 1.5)}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}
