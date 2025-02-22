// Landing page

import { HeroParallaxDemo } from "@/components/hero-1"
import { HeroWithBackgroundBeams } from "@/components/hero-2"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { navItems } from "@/data"


const Home = () => {
  return (
    <main>
<FloatingNav navItems={navItems}/>
<HeroWithBackgroundBeams/>
    </main>
  )
}

export default Home
