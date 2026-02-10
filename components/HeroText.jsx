"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const HeroText = forwardRef(function HeroText(_, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(ref, () => containerRef.current, []);

  // Pin for 500px of scroll, then release
  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=500",
      pin: true,
      pinSpacing: false,
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="welcome-div absolute top-0 left-0 h-screen w-full flex flex-col items-center justify-center z-50 pointer-events-none"
      id="header"
    >
      <h5 id="welcome" className="text-white text-4xl -translate-y-20 opacity-0">
        WELCOME TO
      </h5>

      <h1 className="title-main font-parf text-[15rem] leading-none text-white opacity-0 text-shadow-2xs translate-y-8">
        The Commons
      </h1>

      <h3 className="title-sub text-5xl text-white -translate-y-10 opacity-0">
        EXPLORE THE MAP TO BEGIN
      </h3>
    </div>
  );
});

export default HeroText;
