"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Clouds from "@/components/Clouds";
import Nav from "@/components/Nav";
import Map2 from "@/components/Map2";
import HeroText from "@/components/HeroText";
import CodingSchool from "@/components/CodingSchool";

export default function Home() {
  const containerRef = useRef(null);
  const cloudsRef = useRef(null);

  // =========================
  // SCENES (scalable)
  // =========================
  const SCENES = {
    HOME: "home",
    CODING: "coding",
    DESIGN: "design",
  };

  const [scene, setScene] = useState(SCENES.HOME);

  // =========================
  // READINESS FLAGS
  // =========================
  const [ready, setReady] = useState({
    clouds: false,
    map: false,
  });

  // Triggered by Map2 (house click)
  const [enterSchool, setEnterSchool] = useState(false);

  // =========================
  // READY CALLBACKS
  // =========================
  const onCloudsReady = useCallback(() => {
    setReady(prev => ({ ...prev, clouds: true }));
  }, []);

  const onMapReady = useCallback(() => {
    setReady(prev => ({ ...prev, map: true }));
  }, []);

  // =========================
  // CLOUD ANIMATIONS
  // =========================
  const animateCloudsIn = () => {
    const cloudsEl = cloudsRef.current;
    if (!cloudsEl) return;

    const cg1 = cloudsEl.querySelectorAll(
      '#cloud-group-1 [id^="cloud"]'
    );
    const cg2 = cloudsEl.querySelectorAll(
      '#cloud-group-2 [id^="cloud"]'
    );

    const tl = gsap.timeline();

    cg1.forEach((c, i) => {
      tl.fromTo(
        c,
        { x: -1000, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "sine.out" },
        i * 0.03
      );
    });

    cg2.forEach((c, i) => {
      tl.fromTo(
        c,
        { x: 1000, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "sine.out" },
        i * 0.03
      );
    });

    return tl;
  };

  const animateCloudsOut = () => {
    const cloudsEl = cloudsRef.current;
    if (!cloudsEl) return;

    const cg1 = cloudsEl.querySelectorAll(
      '#cloud-group-1 [id^="cloud"]'
    );
    const cg2 = cloudsEl.querySelectorAll(
      '#cloud-group-2 [id^="cloud"]'
    );

    const tl = gsap.timeline();

    cg1.forEach((c, i) => {
      tl.to(
        c,
        { x: -1000, opacity: 0, duration: 1.2, ease: "sine.in" },
        i * 0.03
      );
    });

    cg2.forEach((c, i) => {
      tl.to(
        c,
        { x: 1000, opacity: 0, duration: 1.2, ease: "sine.in" },
        i * 0.03
      );
    });

    return tl;
  };

  // =========================
  // INTRO (ON LOAD)
  // =========================
  useGSAP(() => {
    if (!ready.clouds || !ready.map) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
      },
    });

    tl.add(animateCloudsOut(), 0)
      .to("#welcome", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to(".title-main", { opacity: 1, y: 0, duration: 1 }, "-=0.5")
      .to(".title-sub", { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .to("#home", { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .to(".nav-link", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
      }, "-=0.8");
  }, { dependencies: [ready], scope: containerRef });

  // =========================
  // ENTER SCHOOL TRANSITION
  // =========================
  useGSAP(() => {
    if (!enterSchool) return;

    const tl = gsap.timeline();

    tl.add(animateCloudsIn())
      .call(() => {
        setScene(enterSchool);
      })
      .add(animateCloudsOut(), "+=0.1");
  }, { dependencies: [enterSchool] });

  // =========================
  // SCENE RENDER MAP
  // =========================
  const SCENE_COMPONENTS = {
    [SCENES.HOME]: (
      <>
        <HeroText />
        <Nav />
        <Map2 onReady={onMapReady} setEnterSchool={setEnterSchool} />
      </>
    ),
    [SCENES.CODING]: <CodingSchool />,
    [SCENES.DESIGN]: <div className="p-12">Design School</div>,
  };

  // =========================
  // RENDER
  // =========================
  return (
    <main
      ref={containerRef}
      className="relative min-h-screen w-full "
    >
      {/* CLOUDS (always on top) */}
      <Clouds ref={cloudsRef} onReady={onCloudsReady} />

      {/* ACTIVE SCENE */}
      <div className="absolute inset-0">
        {SCENE_COMPONENTS[scene]}
      </div>
    </main>
  );
}
