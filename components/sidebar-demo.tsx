"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar-aceternity";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, FilePlus, PieChart, Wallet, BarChart3, Tags, Calendar, Bell, Settings, Users } from "lucide-react";

export function SidebarDemo() {
  const sidebarItems = [
    {
      title: "Main",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard"
        },
        {
          label: "Subscriptions",
          icon: CreditCard,
          href: "/subscriptions"
        },
        {
          label: "Add New",
          icon: FilePlus,
          href: "/subscriptions/new"
        }
      ]
    },
    {
      title: "Analysis",
      items: [
        {
          label: "Reports",
          icon: PieChart,
          href: "/reports"
        },
        {
          label: "Spending",
          icon: Wallet,
          href: "/reports/spending"
        },
        {
          label: "Trends",
          icon: BarChart3,
          href: "/reports/trends"
        }
      ]
    },
    {
      title: "Organization",
      items: [
        {
          label: "Categories",
          icon: Tags,
          href: "/categories"
        },
        {
          label: "Calendar",
          icon: Calendar,
          href: "/calendar"
        },
        {
          label: "Reminders",
          icon: Bell,
          href: "/reminders"
        }
      ]
    },
    {
      title: "Account",
      items: [
        {
          label: "Settings",
          icon: Settings,
          href: "/settings"
        },
        {
          label: "Team",
          icon: Users,
          href: "/settings/team"
        }
      ]
    }
  ];

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Daksh Singh",
                href: "#",
                icon: (
                  <Image
                    src=""
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SubSync
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
