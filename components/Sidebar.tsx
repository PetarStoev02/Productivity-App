"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ListTodo, Settings, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const MENU_ITEMS = [
  { icon: Calendar, label: "Calendar", path: "/" },
  { icon: ListTodo, label: "Tasks", path: "/tasks" },
  { icon: PieChart, label: "Statistics", path: "/statistics" },
  { icon: Settings, label: "Settings", path: "/settings" }
];

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={cn("w-[200px] border-r bg-card", className)}>
      <ScrollArea className="h-full">
        <div className="space-y-2 p-2">
          {MENU_ITEMS.map(({ icon: Icon, label, path }) => (
            <Button
              key={path}
              variant={pathname === path ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => router.push(path)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}