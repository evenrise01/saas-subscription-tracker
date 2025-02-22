"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      if (current > 0.05) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
          width: "100%",
          maxWidth: "1200px",
        }}
        animate={{
          y: 0,
          opacity: 1,
          width: isScrolled ? "750px" : "1200px",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex fixed top-4 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full z-[5000] px-6 py-3 items-center justify-between",
          // Updated styles for blur and background
          isScrolled
            ? "bg-white/70 dark:bg-black/60 backdrop-blur-lg shadow-lg"
            : "bg-transparent backdrop-blur-sm",
          className
        )}
      >
        {/* Logo and Nav Items */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
            <span className={cn("font-semibold", isScrolled ? "hidden" : "block")}>
              SubSync
            </span>
          </Link>
        </div>

        {/* Center Nav Items */}
        <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2 text-base">
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            <Sun className="absolute h-5 w-5 transform transition-transform dark:rotate-90 dark:scale-0" />
            <Moon className="h-5 w-5 transform transition-transform rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </button>
          
          <div className="flex items-center space-x-2">
            {!isScrolled && (
              <button className="text-sm font-semibold relative text-black dark:text-white px-4 py-2 hover:opacity-80">
                Login
              </button>
            )}
            <button className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold relative px-4 py-2 rounded-full hover:opacity-80">
              Sign up
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};