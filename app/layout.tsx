"use client";

import './globals.css';
import { CalendarCheck2 } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main className="h-screen w-screen overflow-hidden">
            <div className="flex flex-col h-full">
              <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-bold">Productivity App</h1>
                </div>
                <ThemeToggle />
              </header>
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}