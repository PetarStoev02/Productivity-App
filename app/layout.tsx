"use client";

import './globals.css';
import { CalendarCheck2 } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen w-screen overflow-hidden">
            <div className="flex flex-col h-full">
              <header className="flex items-center gap-2 p-4 border-b">
                <CalendarCheck2 className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Yearly Goal Tracker</h1>
              </header>
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}