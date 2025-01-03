"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTasks } from "@/hooks/useTasks";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

export function TaskList() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        title: newTask.trim(),
        isDaily: true,
        completed: false
      });
      setNewTask("");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add a new daily task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <Button onClick={handleAddTask} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent group"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <span className={task.completed ? "line-through text-muted-foreground flex-1" : "flex-1"}>
                {task.title}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}