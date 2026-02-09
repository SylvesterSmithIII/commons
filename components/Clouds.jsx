"use client";

import { motion, useScroll, useTransform } from "motion/react";

export default function Clouds({ fadeStart = 0.4, fadeEnd = 0.7 }) {
  const { scrollYProgress } = useScroll();

  // Horizontal parallax
  const x1 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [-200, 200]);
  const x2 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [250, -250]);
  const x3 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [-150, 150]);

  // Vertical movement
  const y1 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [200, -50]);
  const y2 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [250, -20]);
  const y3 = useTransform(scrollYProgress, [fadeStart, fadeEnd], [180, -80]);

  // Fade in and fade out
  const opacity = useTransform(scrollYProgress, [fadeStart, fadeEnd], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
      style={{ opacity }}
    >
      <motion.img
        src="/cloud1.svg"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ x: x1, y: y1 }}
      />
      <motion.img
        src="/cloud2.svg"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ x: x2, y: y2 }}
      />
      <motion.img
        src="/cloud3.svg"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ x: x3, y: y3 }}
      />
    </motion.div>
  );
}
