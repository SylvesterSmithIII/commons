"use client";

import House1 from "./House1";
import House2 from "./House2";
import House3 from "./House3";
import House4 from "./House4";
import House5 from "./House5";

export default function Map() {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 2160 1440"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <image href="/background2.svg" x="0" y="0" width="2160" height="1440" />

        {/* Houses */}
        <House1 />
        <House2 />
        <House3 />
        <House4 />
        <House5 />
      </svg>
    </div>
  );
}
