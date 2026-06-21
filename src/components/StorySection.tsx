import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function StorySection({ title, description }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;

    const tl = gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
          scrub: true,
        },
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={elementRef}
      className="flex h-screen max-w-lg flex-col justify-center items-start text-balance opacity-0"
    >
      <h1 className="text-5xl font-black tracking-tight md:text-7xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
        {title}
      </h1>
      <p className="mt-4 text-lg text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {description}
      </p>
    </section>
  );
}
