"use client";

import { CalendarCheck2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountButton } from "@/components/AccountButton";

export function DashboardNavbar() {
  return (
    <header className="flex items-center justify-between p-20 border-b bg-background">
      <div className="flex items-center gap-2">
        <CalendarCheck2 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Goal Tracker</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AccountButton />
      </div>
    </header>
  );
}