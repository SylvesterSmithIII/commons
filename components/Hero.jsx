"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";


export default function Hero() {

    useGSAP(() => {
        const splitHeader = SplitText.create('h1', {
            type: 'words'
        })

        gsap.from(splitHeader.words, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: 'expo.inOut',
            stagger: 0.4,
           
        })
    })


  return (
    <section className="relative max-w-screen min-h-screen mx-24 my-12">

      <h1 className="text-9xl font-bold text-left text-[#2f1e1b] ">
        LEARN. <br />
        BUILD. <br />
        CREATE.
      </h1>

            <img
                src="/girl.svg"
                alt="drawing of girl"
                className="
                absolute bottom-0 right-0
                h-[85vh] w-auto
                max-w-none
                "
            />


      
    
    </section>
  );
}
