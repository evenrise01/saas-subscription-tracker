import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams";
import MagicButton from "./ui/magic-button";

export function HeroWithBackgroundBeams() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <BackgroundBeamsWithCollision>
        <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-3xl font-semibold text-gray-700 dark:text-neutral-300 md:text-7xl">
          <h2>
            Never lose track of another subscription
            <p className="relative z-20 mx-auto mt-4 max-w-lg pt-4 text-center text-base font-normal tracking-wide text-gray-600 dark:text-gray-200">
              With SubSync, seamlessly sync your subscriptions, all in one
              place.
            </p>
          </h2>
          <div className="mb-10 mt-8 flex flex-col items-center justify-center gap-4 px-8 sm:flex-row md:mb-20">
            <a
              className="px-4 py-2 rounded-xl button text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 bg-white text-black shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] hidden md:block w-40 text-center"
              href="/signup"
            >
              Sign Up
            </a>
            <button className="px-4 py-2 rounded-xl button bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 text-center hidden md:block w-40">
            Learn more
            </button>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
