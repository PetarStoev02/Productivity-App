"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Goal } from "@/types/goals";

export function useGoals() {
  const [goalsCache, setGoalsCache] = useState<Record<string, Goal[]>>({});

  const getGoalsForDate = (date: Date): Goal[] => {
    const dateKey = format(date, "yyyy-MM-dd");
    if (typeof window === "undefined") return [];
    
    if (!goalsCache[dateKey]) {
      const saved = localStorage.getItem(`goals-${dateKey}`);
      const goals = saved ? JSON.parse(saved) : [];
      setGoalsCache(prev => ({ ...prev, [dateKey]: goals }));
      return goals;
    }
    
    return goalsCache[dateKey];
  };

  return { getGoalsForDate };
}