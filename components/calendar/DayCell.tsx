"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TaskDot } from "@/components/calendar/TaskDot";
import { useGoals } from "@/hooks/useGoals";

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  onSelect: (date: Date) => void;
}

export function DayCell({ date, isSelected, onSelect }: DayCellProps) {
  const { getGoalsForDate } = useGoals();
  const goals = getGoalsForDate(date);
  const dayNumber = date.getDate();

  return (
    <button
      onClick={() => onSelect(date)}
      className={cn(
        "aspect-square p-1 relative rounded-full hover:bg-accent",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary"
      )}
    >
      <span className="text-xs">{dayNumber}</span>
      {goals && goals.length > 0 && <TaskDot goals={goals} />}
    </button>
  );
}