"use client";

import Hero from "@/components/Hero";
import Clouds from "@/components/Clouds";
import Map from "@/components/Map";
import { motion } from "motion/react";
import HeroAnimation from "@/components/HeroAnimation";
import LearnSection from "@/components/LearnSection";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      < Nav />
      <HeroAnimation />
      <Hero />
      <LearnSection />
      <Map />
     
    </main>

  );
}
