"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useGoals } from "@/hooks/useGoals";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export function TaskList() {
  const { getGoalsForDate } = useGoals();
  const [selectedDate] = useState(new Date());
  const goals = getGoalsForDate(selectedDate);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-medium mb-4">
          {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <div className="space-y-3">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-3">
              <Checkbox checked={goal.completed} />
              <span className={goal.completed ? "line-through text-muted-foreground" : ""}>
                {goal.text}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}