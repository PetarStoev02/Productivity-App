"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface DayGoalsProps {
  date: Date;
}

export function DayGoals({ date }: DayGoalsProps) {
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`goals-${format(date, "yyyy-MM-dd")}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [newGoal, setNewGoal] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`goals-${format(date, "yyyy-MM-dd")}`);
      setGoals(saved ? JSON.parse(saved) : []);
    }
  }, [date]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `goals-${format(date, "yyyy-MM-dd")}`,
        JSON.stringify(goals)
      );
    }
  }, [goals, date]);

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        { id: crypto.randomUUID(), text: newGoal.trim(), completed: false },
      ]);
      setNewGoal("");
    }
  };

  const toggleGoal = (id: string) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-medium">
        {format(date, "EEEE, MMMM do, yyyy")}
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Add a new goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
        />
        <Button onClick={addGoal} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent group"
          >
            <Checkbox
              checked={goal.completed}
              onCheckedChange={() => toggleGoal(goal.id)}
            />
            <span
              className={`flex-1 ${
                goal.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {goal.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => deleteGoal(goal.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}