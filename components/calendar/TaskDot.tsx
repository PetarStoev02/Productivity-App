"use client";

import { cn } from "@/lib/utils";
import { Goal } from "@/types/goals";

const TASK_COLORS = [
  "bg-chart-1",
  "bg-chart-2", 
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5"
];

interface TaskDotProps {
  goals: Goal[];
}

export function TaskDot({ goals }: TaskDotProps) {
  return (
    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
      {goals.slice(0, 3).map((goal, index) => (
        <span
          key={goal.id}
          className={cn(
            "w-1 h-1 rounded-full",
            goal.completed ? "bg-green-500" : TASK_COLORS[index % TASK_COLORS.length]
          )}
        />
      ))}
      {goals.length > 3 && (
        <span className="w-1 h-1 rounded-full bg-gray-400" />
      )}
    </div>
  );
}