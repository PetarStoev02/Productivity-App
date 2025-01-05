"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ListTodo, Settings, PieChart, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { icon: Calendar, label: "Calendar", path: "/dashboard" },
  { icon: ListTodo, label: "Tasks", path: "/tasks" },
  { icon: DollarSign, label: "Finances", path: "/finances" },
  { icon: PieChart, label: "Statistics", path: "/statistics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-card transition-all",
        collapsed ? "w-[80px]" : "w-[200px]",
        className
      )}
    >
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-center",
          "w-6 h-12 bg-card cursor-pointer border-l border-border z-10"
        )}
        onClick={() => setCollapsed(!collapsed)}
        role="button"
        aria-label="Toggle Sidebar"
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </div>
      <ScrollArea className="h-full">
        <div className="space-y-2 p-2">
          {MENU_ITEMS.map(({ icon: Icon, label, path }) => (
            <Button
              key={path}
              variant={pathname === path ? "secondary" : "ghost"}
              className={cn("w-full justify-start gap-2", collapsed && "justify-center")}
              onClick={() => router.push(path)}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{label}</span>}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
