"use client";

import { useState } from "react";
import { YearlyCalendar } from "@/components/YearlyCalendar";
import { DayGoals } from "@/components/DayGoals";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CalendarCheck2 } from "lucide-react";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="h-full max-w-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <header className="flex items-center gap-2 p-4 border-b">
          <CalendarCheck2 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Yearly Goal Tracker</h1>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1">
            <YearlyCalendar
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Daily Goals</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <DayGoals date={selectedDate} />
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}
