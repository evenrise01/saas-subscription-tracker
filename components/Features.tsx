"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeaturesSection() {
  return (
    <section id="features">
      <h2 className="p-4 text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold text-gray-700 dark:text-neutral-300 md:text-7xl">
        Subscriptions made easy
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {/* Row 1: Big card | Small card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GridItem
              icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="Do things the right way"
              description="First"
              className="h-full"
            />
          </div>
          <div className="md:col-span-5 md:h-[60vh]">
            <GridItem
              icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="You should buy Aceternity UI Pro"
              description="Third"
              className="h-full"
            />
          </div>
        </div>

        {/* Row 2: Small card | Big card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <GridItem
              icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="The best AI code editor ever."
              description="Second"
              className="h-full"
            />
          </div>
          <div className="md:col-span-7">
            <GridItem
              icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="This card is also built by Cursor"
              description="Fourth"
              className="h-full"
            />
          </div>
        </div>

        {/* Row 3: Big card | Small card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <GridItem
              icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="Coming soon on Aceternity UI"
              description="Fifth"
              className="h-full"
            />
          </div>
          <div className="md:col-span-5">
            {/* This is an empty space or could be filled with another card if needed */}
            <GridItem
              icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
              title="Coming soon on Aceternity UI"
              description="Sixth"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

const GridItem = ({ icon, title, description, className = "" }: GridItemProps) => {
  return (
    <div className={`min-h-[14rem] ${className}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
                {title}
              </h3>
              <h2
                className="[&_b]:md:font-semibold [&_strong]:md:font-semibold text-sm/[1.125rem] 
              md:text-base/[1.375rem] text-black dark:text-neutral-400"
              >
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};