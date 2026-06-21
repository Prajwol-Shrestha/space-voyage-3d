import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FlyingCameraProps {
  startZ: number;
  endZ: number;
}

export default function FlyingCamera({ startZ, endZ }: FlyingCameraProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, startZ);

    const animation = gsap.to(camera.position, {
      z: endZ,
      ease: "none",
      scrollTrigger: {
        trigger: "html",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [camera, startZ, endZ]);

  return null;
}
