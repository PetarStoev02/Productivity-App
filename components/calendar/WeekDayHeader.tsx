"use client";

export function WeekDayHeader() {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  return (
    <>
      {weekDays.map((day) => (
        <div key={day} className="text-muted-foreground font-medium py-1">
          {day}
        </div>
      ))}
    </>
  );
}