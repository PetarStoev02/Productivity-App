"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { Footer } from "@/components/layout/Footer";

const PUBLIC_PATHS = ["/", "/login", "/register"];
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);

  return (
    <html lang="bg">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {isPublicPath ? (
              <div className="flex min-h-screen flex-col">
                {pathname === "/" ? <LandingNavbar /> : <PublicNavbar />}
                <main className="flex-1">{children}</main>
                {pathname === "/" && <Footer />}
              </div>
            ) : (
              <main className="h-screen w-screen overflow-hidden">
                <div className="flex flex-col h-full">
                  <DashboardNavbar />
                  <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 overflow-auto px-20">{children}</div>
                  </div>
                </div>
              </main>
            )}
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
