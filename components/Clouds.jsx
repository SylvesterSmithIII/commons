"use client";

import { forwardRef, useEffect, useRef, useImperativeHandle } from "react";

const Clouds = forwardRef(function Clouds({ onReady }, ref) {
  const containerRef = useRef(null);
  const readyFired = useRef(false);

  // Expose the container DOM node to parent via ref
  useImperativeHandle(ref, () => containerRef.current, []);

  // Load SVG, then signal ready
  useEffect(() => {
    let cancelled = false;

    fetch("/cloud-overlay.svg")
      .then((res) => res.text())
      .then((svgText) => {
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = svgText;

        const svgEl = containerRef.current.querySelector("svg");
        if (svgEl) {
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "100%");
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid slice");
          svgEl.style.display = "block";
        }

        if (!readyFired.current) {
          readyFired.current = true;
          onReady?.();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden z-50 pointer-events-none"
    />
  );
});

export default Clouds;
