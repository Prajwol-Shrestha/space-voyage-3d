import { Canvas } from "@react-three/fiber";
import FlyingCamera from "./components/FlyingCamera";
import Galaxy from "./components/Galaxy";
import Planet from "./components/Planet";
import StorySection from "./components/StorySection";

export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white antialiased selection:bg-orange-500/30">
      {/* layer 1 fxied canvas */}
      <div className="fixed inset-0 z-10 w-full h-full pointer-events-none">
        <Canvas
          camera={{ fov: 60, near: 0.1, far: 2000 }}
          gl={{ antialias: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.3} />
          <pointLight
            position={[0, 0, 0]}
            intensity={3}
            distance={1000}
            decay={1}
          />

          <FlyingCamera startZ={15} endZ={-800} />

          <Planet
            position={[0, 0, 0]}
            color="#ffaa00"
            size={4}
            rotationSpeed={0.1}
          />
          <Planet
            position={[3, 1, -40]}
            color="#8a8d8f"
            size={0.6}
            rotationSpeed={0.4}
          />
          <Planet
            position={[-4, -1, -80]}
            color="#e3bb76"
            size={1.2}
            rotationSpeed={0.2}
          />
          <Planet
            position={[4, 2, -120]}
            color="#2b82c9"
            size={1.3}
            rotationSpeed={0.5}
          />
          <Planet
            position={[-2, 1, -160]}
            color="#c1440e"
            size={0.8}
            rotationSpeed={0.4}
          />

          <Planet
            position={[6, -2, -280]}
            color="#b07f35"
            size={2.5}
            rotationSpeed={0.8}
          />
          <Planet
            position={[-7, 3, -360]}
            color="#e2bf7d"
            size={2.0}
            rotationSpeed={0.7}
          />
          <Planet
            position={[5, -1, -440]}
            color="#4b70dd"
            size={1.6}
            rotationSpeed={0.3}
          />
          <Planet
            position={[-4, -2, -520]}
            color="#274687"
            size={1.5}
            rotationSpeed={0.3}
          />

          <Galaxy count={4000} position={[0, 0, -700]} />
        </Canvas>
      </div>

      {/* layer 2  Text Overlay storyline*/}
      <div className="relative z-20 w-full mx-auto px-6 md:px-12 class-scroll-wrapper">
        <StorySection
          title="The Sun"
          description="Our journey begins at the blazing center of our Solar System, a dynamic nuclear engine binding these celestial worlds together."
        />
        <StorySection
          title="Mercury"
          description="The smallest planet, scorched by extreme proximity to our home star, moving through silent, cratered isolation."
        />
        <StorySection
          title="Venus"
          description="Spinning backward underneath a crushing, toxic blanket of acid clouds. A greenhouse world trapped in runaway heat."
        />
        <StorySection
          title="Earth"
          description="A fragile blue oasis protected by a delicate magnetic shield, harboring the only known spark of life across the vast void."
        />
        <StorySection
          title="Mars"
          description="The rusted desert world. Iron-rich dust blankets frozen canyons and ancient, dried riverbeds waiting for exploration."
        />
        <StorySection
          title="The Asteroid Belt"
          description="Millions of tumbling geometric rock fragments forming a cosmic boundary line dividing the rocky inner worlds from the outer giants."
        />
        <StorySection
          title="Jupiter"
          description="The king of worlds. A swirling gas giant twice the mass of all other planets combined, continuously locked in colossal storms."
        />
        <StorySection
          title="Saturn"
          description="A majestic gas sphere adorned with brilliant, sweeping rings made of ice shards and cosmic debris caught in orbital harmony."
        />
        <StorySection
          title="Uranus & Neptune"
          description="The deep ice giants. Pale blue globes swept by supersonic methane winds, marking the frozen edge of our sun's immediate reach."
        />
        <StorySection
          title="Beyond the Rim"
          description="Leaving the boundary of our star. The Solar System shrinks to a tiny speck as we plummet toward billions of churning star clusters in deep space."
        />
      </div>
    </div>
  );
}
