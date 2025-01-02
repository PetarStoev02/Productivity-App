"use client";

import { getDaysInMonth, startOfMonth, format } from "date-fns";
import { DayCell } from "@/components/calendar/DayCell";
import { WeekDayHeader } from "@/components/calendar/WeekDayHeader";

interface DayGridProps {
  year: number;
  month: number;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function DayGrid({ year, month, selectedDate, onSelectDate }: DayGridProps) {
  const startDate = startOfMonth(new Date(year, month));
  const totalDays = getDaysInMonth(startDate);
  const startDay = startDate.getDay();

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-sm">
      <WeekDayHeader />
      
      {Array.from({ length: startDay }).map((_, i) => (
        <div key={`empty-${i}`} className="aspect-square" />
      ))}
      
      {Array.from({ length: totalDays }).map((_, i) => {
        const date = new Date(year, month, i + 1);
        const dateString = format(date, 'yyyy-MM-dd');
        const isSelected = format(selectedDate, 'yyyy-MM-dd') === dateString;

        return (
          <DayCell
            key={dateString}
            date={date}
            isSelected={isSelected}
            onSelect={onSelectDate}
          />
        );
      })}
    </div>
  );
}