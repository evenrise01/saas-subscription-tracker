// Landing page


import { FeaturesSection } from "@/components/Features";
import { HeroWithBackgroundBeams } from "@/components/hero";
import { HeroTransition } from "@/components/hero-transition";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

const Home = () => {
  return (
    <main >
      <FloatingNav navItems={navItems} />
      <HeroWithBackgroundBeams />
      <HeroTransition/>
      <FeaturesSection/>
    </main>
  );
};

export default Home;
