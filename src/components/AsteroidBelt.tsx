import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface AsteroidBeltProps {
  position?: [number, number, number];
  count?: number;
}

function getRandomGeometry(size: number): THREE.BufferGeometry {
  const type = Math.floor(Math.random() * 3);
  switch (type) {
    case 0:
      // Icosahedron — rounder, like a large rocky body
      return new THREE.IcosahedronGeometry(size, 0);
    case 1:
      // Dodecahedron — 12 faces, slightly more angular
      return new THREE.DodecahedronGeometry(size, 0);
    case 2:
    default:
      // Tetrahedron — very jagged and sharp, like a small fragment
      return new THREE.TetrahedronGeometry(size, 0);
  }
}

export default function AsteroidBelt({
  position = [0, 0, -220],
  count = 320,
}: AsteroidBeltProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/asteroid/rock_color.jpg",
    "/textures/asteroid/rock_normalGL.jpg",
    "/textures/asteroid/rock_roughness.jpg",
  ]);

  // Non-uniform scale per asteroid — stretches the geometry so
  // no two look the same even if they share the same base shape
  const asteroids = useMemo(() => {
    return Array.from({ length: count }, () => {
      const radius = 8 + Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const yScatter = (Math.random() - 0.5) * 2.5;

      return {
        position: [
          Math.cos(angle) * radius,
          yScatter,
          Math.sin(angle) * radius,
        ] as [number, number, number],

        size: 0.06 + Math.pow(Math.random(), 3) * 0.5,

        scaleX: 0.7 + Math.random() * 0.8,
        scaleY: 0.5 + Math.random() * 0.7,
        scaleZ: 0.6 + Math.random() * 0.9,

        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.6,
        geometry: getRandomGeometry(1), // size=1, we scale via mesh scale
      };
    });
  }, [count]);

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
          scale={[
            asteroid.size * asteroid.scaleX,
            asteroid.size * asteroid.scaleY,
            asteroid.size * asteroid.scaleZ,
          ]}
        >
          <primitive object={asteroid.geometry} />
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            normalScale={new THREE.Vector2(0.8, 0.8)}
            roughnessMap={roughnessMap}
            roughness={0.9}
            metalness={0.0}
            emissive={new THREE.Color(0.02, 0.02, 0.02)}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}
