"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", completed: 4, total: 5 },
  { name: "Tue", completed: 3, total: 4 },
  { name: "Wed", completed: 5, total: 5 },
  { name: "Thu", completed: 2, total: 6 },
  { name: "Fri", completed: 4, total: 4 },
  { name: "Sat", completed: 3, total: 3 },
  { name: "Sun", completed: 1, total: 3 },
];

export function CompletionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Completion Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(var(--muted))" />
              <Bar dataKey="completed" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}