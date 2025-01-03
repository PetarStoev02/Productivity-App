"use client";

import { useState, useEffect } from 'react';
import { Task } from '@/types/tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('daily-tasks');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('daily-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  };
}