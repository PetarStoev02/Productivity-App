"use client";

import { MonthGrid } from "@/components/MonthGrid";
import { ScrollArea } from "@/components/ui/scroll-area";

interface YearlyCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function YearlyCalendar({ selectedDate, onSelectDate }: YearlyCalendarProps) {
  const currentYear = selectedDate.getFullYear();

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 12 }, (_, i) => (
            <MonthGrid
              key={i}
              year={currentYear}
              month={i}
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}