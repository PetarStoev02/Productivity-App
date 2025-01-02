"use client";

import { cn } from "@/lib/utils";
import { Goal } from "@/types/goals";

interface TaskDotProps {
  goals: Goal[];
}

export function TaskDot({ goals }: TaskDotProps) {
  if (!goals?.length) return null;

  return (
    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
      {goals.slice(0, 3).map((goal) => (
        <span
          key={goal.id}
          className={cn(
            "w-1 h-1 rounded-full",
            goal.completed ? "bg-green-500" : "bg-blue-500"
          )}
        />
      ))}
      {goals.length > 3 && (
        <span className="w-1 h-1 rounded-full bg-gray-400" />
      )}
    </div>
  );
}