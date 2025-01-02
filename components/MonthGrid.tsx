"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DayGrid } from "@/components/DayGrid";

interface MonthGridProps {
  year: number;
  month: number;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function MonthGrid({ year, month, selectedDate, onSelectDate }: MonthGridProps) {
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return (
    <Card className="shadow-sm">
      <CardHeader className="py-3">
        <CardTitle className="text-lg font-medium">{monthName}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <DayGrid
          year={year}
          month={month}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
        />
      </CardContent>
    </Card>
  );
}