"use client";

import { useRef, useEffect } from "react";

export default function CodingSchool() {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadSVG = async () => {
      if (!containerRef.current) return;

      const res = await fetch("/coding-school.svg");
      const svgText = await res.text();
      containerRef.current.innerHTML = svgText;

      // Make the SVG responsive
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
      }
    };

    loadSVG();
  }, []);

  return <div ref={containerRef} className="relative w-full h-full" />;
}
