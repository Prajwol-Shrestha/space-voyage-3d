import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  rotationSpeed?: number;
  texturePath: string;
  normalPath?: string; // for craters / bumps
  specularPath?: string; // for reflections
  atmospherePath?: string; // for clouds
  ringTexturePath?: string;
  ringAlphaPath?: string;
}

export default function Planet({
  position,
  size,
  rotationSpeed = 0.5,
  texturePath,
  normalPath,
  specularPath,
  atmospherePath,
  ringTexturePath,
  ringAlphaPath,
}: PlanetProps) {
  const groundRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const textureConfig: Record<string, string> = { map: texturePath };
  if (normalPath) textureConfig.normalMap = normalPath;
  if (specularPath) textureConfig.roughnessMap = specularPath;
  if (atmospherePath) textureConfig.atmosphereMap = atmospherePath;
  if (ringTexturePath) textureConfig.ringMap = ringTexturePath;
  if (ringAlphaPath) textureConfig.ringAlpha = ringAlphaPath;

  // precache textures in GPU before loading
  const loaded = useTexture(textureConfig);

  // wrapping enforcement to prevent stitching lines
  Object.values(loaded).forEach((texture) => {
    if (texture instanceof THREE.Texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  });

  useFrame((_, delta) => {
    if (groundRef.current) {
      // Rotate the planet surface around the vertical Y axis
      groundRef.current.rotation.y += delta * rotationSpeed;
    }
    if (cloudsRef.current) {
      // clouds drift slightly faster than ground rotation speeds
      cloudsRef.current.rotation.y += delta * (rotationSpeed * 1.15);
    }
  });

  const isSun = texturePath.includes("sun");
  const isVenus = texturePath.includes("venus");

  return (
    <group position={position}>
      <mesh ref={groundRef}>
        <sphereGeometry args={[size, 80, 80]} />
        <meshStandardMaterial
          map={loaded.map}
          normalMap={normalPath ? loaded.normalMap : null}
          normalScale={new THREE.Vector2(0.3, 0.3)}
          roughnessMap={specularPath ? loaded.roughnessMap : null}
          roughness={isSun ? 0.2 : normalPath ? 0.4 : 0.7}
          metalness={isSun ? 0.0 : 0.1}
          emissive={
            isSun ? new THREE.Color("#ffaa00") : new THREE.Color("#000000")
          }
          emissiveMap={isSun ? loaded.map : null}
          emissiveIntensity={isSun ? 1.5 : 0}
        />
      </mesh>

      {atmospherePath && (
        <mesh ref={cloudsRef} scale={[1.012, 1.012, 1.012]}>
          <sphereGeometry args={[size, 80, 80]} />
          <meshStandardMaterial
            map={loaded.atmosphereMap}
            transparent={true}
            opacity={isVenus ? 0.95 : 0.65}
            blending={THREE.NormalBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {(ringTexturePath || ringAlphaPath) && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.4, 80]} />
          <meshStandardMaterial
            map={ringTexturePath ? loaded.ringMap : undefined}
            alphaMap={ringAlphaPath ? loaded.ringAlpha : null}
            transparent={true}
            side={THREE.DoubleSide}
            color={ringTexturePath ? "#ffffff" : "#e2bf7d"}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      )}
    </group>
  );
}
