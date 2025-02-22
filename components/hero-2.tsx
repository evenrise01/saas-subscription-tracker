import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams";

export function HeroWithBackgroundBeams() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <BackgroundBeamsWithCollision>
        <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold tracking-tight text-gray-700 dark:text-neutral-300 md:text-7xl">
          <h2>
            Never lose track of another subscription
            <p className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base font-normal text-gray-600 dark:text-gray-200">
              With our state of the art, cutting edge, we are so back kinda
              hosting services, you can deploy your website in seconds.
            </p>
          </h2>
          <div className="mb-10 mt-8 flex w-full flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20">

          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
