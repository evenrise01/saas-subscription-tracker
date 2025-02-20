"use client"
import { 
  LayoutDashboard, 
  CreditCard, 
  PieChart, 
  Settings, 
  Users, 
  Bell, 
  Tags,
  Wallet,
  BarChart3,
  Calendar,
  FilePlus,
  FolderKanban,
  Wallet2,
  Moon,
  Sun
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

// Menu items.
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

  export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    return (
      <Sidebar>
          <SidebarHeader>
              <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center space-x-2">
                      <Wallet2 className="h-8 w-8 text-blue-600" />
                      <div>
                          <h1 className="font-bold text-lg">SubSync</h1>
                      </div>
                  </div>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                  </Button>
              </div>
          </SidebarHeader>
          <SidebarContent>
              {sidebarItems.map((section) => (
                  <SidebarGroup key={section.title}>
                      <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                      <SidebarGroupContent>
                          <SidebarMenu>
                              {section.items.map((item) => (
                                  <SidebarMenuItem key={item.label}>
                                      <SidebarMenuButton asChild>
                                          <a href={item.href}>
                                              <item.icon className="w-4 h-4 mr-2" />
                                              <span>{item.label}</span>
                                          </a>
                                      </SidebarMenuButton>
                                  </SidebarMenuItem>
                              ))}
                          </SidebarMenu>
                      </SidebarGroupContent>
                  </SidebarGroup>
              ))}
          </SidebarContent>
      </Sidebar>
  );
  }