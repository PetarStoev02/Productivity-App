"use client";

import './globals.css';
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { Footer } from "@/components/layout/Footer";

const PUBLIC_PATHS = ['/', '/login', '/register'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <Providers>
          {isPublicPath ? (
            <div className="flex min-h-screen flex-col">
              {pathname === '/' ? <LandingNavbar /> : <PublicNavbar />}
              <main className="flex-1">{children}</main>
              {pathname === '/' && <Footer />}
            </div>
          ) : (
            <main className="h-screen w-screen overflow-hidden">
              <div className="flex flex-col h-full">
                <DashboardNavbar />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <div className="flex-1 overflow-auto px-20">
                    {children}
                  </div>
                </div>
              </div>
            </main>
          )}
        </Providers>
      </body>
    </html>
  );
}