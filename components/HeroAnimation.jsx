'use client'

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function HeroAnimation() {
  const containerRef = useRef()
  const textRef = useRef()

  useGSAP(() => {
    document.body.style.overflow = "hidden"

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto"
      }
    })

    tl.fromTo(
      textRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "power4.out" }
    )
    .to(textRef.current, {
      scale: 20,
      duration: 1.2,
      ease: "power4.inOut"
    })
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4
    }, "-=0.4")

  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        font-stardom
        bg-white
      "
    >
      <h1
        ref={textRef}
        className="
        text-black
          text-5xl
          font-bold
          leading-none
          whitespace-nowrap
          opacity-0
        "
      >
        the commons
      </h1>
    </section>
  )
}
