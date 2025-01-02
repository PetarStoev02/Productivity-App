"use client";

import { getDaysInMonth, startOfMonth, format } from "date-fns";
import { TaskDot } from "@/components/TaskDot";
import { cn } from "@/lib/utils";
import { useGoals } from "@/hooks/useGoals";

interface YearGridProps {
  year: number;
  month: number;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function YearGrid({ year, month, selectedDate, onSelectDate }: YearGridProps) {
  const startDate = startOfMonth(new Date(year, month));
  const totalDays = getDaysInMonth(startDate);
  const startDay = startDate.getDay();
  const { getGoalsForDate } = useGoals();

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-sm">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
        <div key={day} className="text-muted-foreground font-medium py-1">
          {day}
        </div>
      ))}
      
      {Array.from({ length: startDay }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}
      
      {Array.from({ length: totalDays }).map((_, i) => {
        const date = new Date(year, month, i + 1);
        const dateString = format(date, 'yyyy-MM-dd');
        const isSelected = format(selectedDate, 'yyyy-MM-dd') === dateString;
        const goals = getGoalsForDate(date);

        return (
          <button
            key={i}
            onClick={() => onSelectDate(date)}
            className={cn(
              "aspect-square p-1 relative rounded-full hover:bg-accent",
              isSelected && "bg-primary text-primary-foreground hover:bg-primary"
            )}
          >
            <span className="text-xs">{i + 1}</span>
            <TaskDot goals={goals} />
          </button>
        );
      })}
    </div>
  );
}