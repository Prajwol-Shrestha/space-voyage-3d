import { Canvas } from "@react-three/fiber";
import AsteroidBelt from "./components/AsteroidBelt";
import FlyingCamera from "./components/FlyingCamera";
import Galaxy from "./components/Galaxy";
import Planet from "./components/Planet";
import StorySection from "./components/StorySection";

export default function App() {
  return (
    <div className="relative w-full min-h-screen  text-white antialiased selection:bg-orange-500/30">
      {/* layer 1 fxied canvas */}
      <div
        className="fixed inset-0 z-10 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('/textures/space-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Canvas
          camera={{ fov: 60, near: 0.1, far: 3000 }}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1} />
          <pointLight
            position={[0, 0, 0]}
            intensity={8}
            distance={1500}
            decay={1.5}
          />
          {/* <directionalLight position={[0, 0, 1]} intensity={1.5} /> */}
          <FlyingCamera startZ={20} endZ={-1200} />

          <Planet
            position={[0, 0, 0]}
            size={4}
            rotationSpeed={0.1}
            texturePath="/textures/2k_sun.jpg"
          />
          <Planet
            position={[1.85, 0.5, -125]}
            size={0.6}
            rotationSpeed={0.4}
            texturePath="/textures/2k_mercury.jpg"
          />
          <Planet
            position={[-3, -0.5, -265]}
            size={1.2}
            rotationSpeed={0.2}
            texturePath="/textures/2k_venus_surface.jpg"
            atmospherePath="/textures/2k_venus_atmosphere.jpg"
          />
          <Planet
            position={[2, 1, -405]}
            size={1.3}
            rotationSpeed={0.5}
            texturePath="/textures/2k_earth_daymap.jpg"
            normalPath="/textures/2k_earth_normal_map.jpg"
            specularPath="/textures/2k_earth_specular_map.jpg"
            atmospherePath="/textures/2k_earth_clouds.jpg"
          />
          <Planet
            position={[-2, 1, -545]}
            size={0.8}
            rotationSpeed={0.4}
            texturePath="/textures/2k_mars.jpg"
          />
          <AsteroidBelt position={[0, 0, -685]} count={320} />

          <Planet
            position={[4, -2, -825]}
            size={2.5}
            rotationSpeed={0.8}
            texturePath="/textures/2k_jupiter.jpg"
          />
          <Planet
            position={[-7, 3, -965]}
            size={2.0}
            rotationSpeed={0.7}
            texturePath="/textures/2k_saturn.jpg"
            ringAlphaPath="/textures/2k_saturn_ring_alpha.png"
          />
          <Planet
            position={[5, -1, -1105]}
            size={1.6}
            rotationSpeed={0.3}
            texturePath="/textures/2k_uranus.jpg"
          />
          <Planet
            position={[-4, -2, -1145]}
            size={1.5}
            rotationSpeed={0.3}
            texturePath="/textures/2k_neptune.jpg"
          />

          <Galaxy
            texturePath="/textures/steller-forge.jpg"
            position={[0, 0, -1240]}
          />
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
