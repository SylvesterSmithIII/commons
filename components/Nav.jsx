import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function Nav() {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',
                start: 'bottom top',
            }
        })

        navTween.fromTo('nav', { backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        })
    })

    return (
        <nav className="fixed top-0 z-50 w-full py-4 text-lg">
            <div className="flex justify-between mx-24 ">
                <a href="#home" className="flex items-center gap-2">
                    <p>The Commons</p>
                </a>

                <ul>
                    <li>
                        <a href={`#about`}>About</a>
                        <a href={`#learn`}>Learn</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}