"use client";

import { TaskList } from "@/components/tasks/TaskList";

export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>
      <TaskList />
    </div>
  );
}