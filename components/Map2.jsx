"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Map2({ onReady, setEnterSchool }) {
  const containerRef = useRef(null);
  const topTriggerRef = useRef(null);
  const bottomTriggerRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const readyFired = useRef(false);

  // =========================
  // FIREWORKS
  // =========================
  const spawnFireworksFromHouse = (el) => {
    if (!el || !containerRef.current) return;

    const houseRect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const originX =
      houseRect.left - containerRect.left + houseRect.width / 2;
    const originY =
      houseRect.top - containerRect.top + houseRect.height * 0.25;

    const colors = ["#FFD166", "#EF476F", "#06D6A0", "#118AB2"];

    for (let i = 0; i < 16; i++) {
      const spark = document.createElement("div");

      Object.assign(spark.style, {
        position: "absolute",
        left: `${originX}px`,
        top: `${originY}px`,
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        pointerEvents: "none",
        zIndex: "5",
      });

      containerRef.current.appendChild(spark);

      const angle = gsap.utils.random(-Math.PI * 0.85, -Math.PI * 0.15);
      const distance = gsap.utils.random(80, 160);

      gsap.fromTo(
        spark,
        { scale: 0, opacity: 1 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 1,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          onComplete: () => spark.remove(),
        }
      );
    }
  };

  // =========================
  // LOAD SVG
  // =========================
  useEffect(() => {
    let cancelled = false;

    fetch("/map-tall.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector("svg");
        if (svg) {
          svg.style.width = "100%";
          svg.style.height = "auto";
        }

        setSvgLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================
  // GSAP LOGIC
  // =========================
  useGSAP(
    () => {
      if (!svgLoaded || !containerRef.current) return;

      // -------------------------
      // CLOUD PRESETS
      // -------------------------
      const CLOUD_PRESETS = {
        fast: { fromX: -2000, toX: 2000, duration1: 20, duration2: 20 },
        slow: { fromX: -2000, toX: 1000, duration1: 10, duration2: 25 },
      };

      function animateCloud(el, preset, trigger) {
        const tl = gsap.timeline({ repeat: -1, paused: true });

        tl.to(el, {
          x: preset.toX,
          duration: preset.duration1,
          ease: "sine.inOut",
        }).fromTo(
          el,
          { x: preset.fromX },
          {
            x: preset.toX,
            duration: preset.duration2,
            ease: "sine.inOut",
            immediateRender: false,
          }
        );

        ScrollTrigger.create({
          trigger,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeave: () => tl.pause(),
          onLeaveBack: () => tl.pause(),
        });
      }

      // -------------------------
      // TOP CLOUDS
      // -------------------------
      [
        { id: "#top-cloud-1", preset: "fast" },
        { id: "#top-cloud-2", preset: "fast" },
        { id: "#top-could-3", preset: "slow" },
        { id: "#top-cloud-4", preset: "slow" },
      ].forEach(({ id, preset }) => {
        const el = containerRef.current.querySelector(id);
        if (el) animateCloud(el, CLOUD_PRESETS[preset], topTriggerRef.current);
      });

      // -------------------------
      // BOTTOM CLOUDS
      // -------------------------
      [
        { id: "#bottom-cloud-1", preset: "fast" },
        { id: "#bottom-cloud-2", preset: "fast" },
        { id: "#bottom-cloud-3", preset: "slow" },
        { id: "#bottom-cloud-4", preset: "slow" },
      ].forEach(({ id, preset }) => {
        const el = containerRef.current.querySelector(id);
        if (el)
          animateCloud(el, CLOUD_PRESETS[preset], bottomTriggerRef.current);
      });

      // -------------------------
      // HOUSE INTERACTION
      // -------------------------
      const house = containerRef.current.querySelector("#coding-school");
      if (house) {
        gsap.set(house, {
          transformOrigin: "50% 50%",
          cursor: "pointer",
        });

        gsap.from(house, {
          scale: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "bounce.out",
        });

        house.addEventListener("mouseenter", () => {
          gsap.to(house, {
            scale: 1.06,
            y: -24,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        house.addEventListener("mouseleave", () => {
          gsap.to(house, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        house.addEventListener("click", () => {
          gsap
            .timeline()
            .to(house, {
              rotation: 6,
              x: 6,
              duration: 0.08,
              repeat: 5,
              yoyo: true,
              ease: "power1.inOut",
            })
            .to(house, {
              rotation: 0,
              x: 0,
              duration: 0.3,
              ease: "elastic.out(1, 0.4)",
            });

          spawnFireworksFromHouse(house);

          setTimeout(() => {
            setEnterSchool?.("coding");
          }, 1000)
        });
      }

      // -------------------------
      // READY CALLBACK
      // -------------------------
      if (!readyFired.current) {
        readyFired.current = true;
        onReady?.();
      }
    },
    { dependencies: [svgLoaded] }
  );

  return (
    <section className="relative w-full">
      <div ref={topTriggerRef} className="absolute top-0 w-full h-screen" />
      <div ref={containerRef} className="relative z-0 w-full" />
      <div
        ref={bottomTriggerRef}
        className="absolute bottom-0 w-full h-[120vh] -z-10"
      />
    </section>
  );
}
