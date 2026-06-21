import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Planet({ position, color, size, rotationSpeed = 0.5 }) {
  const meshRef = useRef(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      
      <meshStandardMaterial 
        color={color} 
        roughness={0.6} 
        metalness={0.1} 
      />
    </mesh>
  );
}