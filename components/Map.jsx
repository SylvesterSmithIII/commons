import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Map() {
  const containerRef = useRef();

  useGSAP(async () => {
    // Load your SVG
    const res = await fetch('/AIO.svg');
    const svg = await res.text();
    
    containerRef.current.innerHTML = svg;
    
    // Make SVG responsive
    const svgElement = containerRef.current.querySelector('svg');
    if (svgElement) {
      svgElement.style.width = '100%';
      svgElement.style.height = 'auto';
    }
    
    // Now animate houses by ID
    const houses = ['#house1', '#house2', '#house3', '#house4', '#house5'];
    
    houses.forEach((house, i) => {
      const el = containerRef.current.querySelector(house);
      
      if (el) {
        // REQUIRED for SVG transforms to work
        el.style.transformBox = 'fill-box';
        el.style.transformOrigin = '50% 100%';
        el.style.cursor = 'pointer';
        
        // Bounce-in animation
        gsap.from(el, {
          scale: 0,
          duration: 0.8,
          delay: i + 1,
          ease: 'bounce'
        });
        
        // Hover effect
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.06, y: -24, duration: 0.3, ease: "power2.out" });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
        });
      }
    });
    
    // Animate clouds to travel right and loop
    const clouds = ['#cloud1', '#cloud2', '#cloud3', '#cloud4'];
    const titleEl = containerRef.current.querySelector('#Title');
    
    clouds.forEach((cloud, i) => {
      const el = containerRef.current.querySelector(cloud);
      if (el && titleEl) {
        const duration = 15 + (i * 3); // Different speeds: 15s, 18s, 21s, 24s
        
        // Reorder DOM: cloud1 & cloud4 before title (behind), cloud2 & cloud3 after title (in front)
        if (i === 0 || i === 3) {
          // Insert before title to render behind
          titleEl.parentNode.insertBefore(el, titleEl);
        } else {
          // Insert after title to render in front
          titleEl.parentNode.insertBefore(el, titleEl.nextSibling);
        }
        
        const tl = gsap.timeline({ repeat: -1 });
        
        tl.to(el, {
          x: '100vw',
          duration: duration,
          ease: 'none'
        })
        .to(el, {
          opacity: 0,
          duration: 2,
          ease: 'power2.in'
        }, '-=2') // Start fading 2 seconds before reaching the edge
        .set(el, {
          x: '-20%', // Reset to left off-screen
          opacity: 0
        })
        .to(el, {
          x: '-20%',
          opacity: 1,
          duration: 3,
          ease: 'power2.out'
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className='w-full relative'
    >
    
    </div>
  );
}