// Landing page


import { FeaturesSection } from "@/components/Features";
import { HeroWithBackgroundBeams } from "@/components/hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data";

const Home = () => {
  return (
    <main>
      <FloatingNav navItems={navItems} />
      <HeroWithBackgroundBeams />
      <FeaturesSection/>
    </main>
  );
};

export default Home;
