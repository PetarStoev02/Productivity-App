"use client";

import { StatsOverview } from "@/components/statistics/StatsOverview";
import { CompletionChart } from "@/components/statistics/CompletionChart";

export default function StatisticsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>
      <div className="grid gap-6">
        <StatsOverview />
        <CompletionChart />
      </div>
    </div>
  );
}