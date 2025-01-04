"use client"
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import { CalendarCheck2 } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Providers } from "./providers";
import faviconIcon from "../public/Favicon Icon.png";
import { AccountButton } from "@/components/AccountButton";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Productiven - Goal Tracker",
//   description:
//     "",
//   metadataBase: new URL("https://productiven.org"),
//   alternates: {
//     canonical: "/",
//   },
//   icons: {
//     icon: {
//       url: faviconIcon.src,
//       href: faviconIcon.src,
//     },
//   },
//   openGraph: {
//     title: "Productiven",
//     description: "Productiven - Goal Tracker",
//     siteName: "Productiven",
//     locale: "bg_BG",
//     type: "website",
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main className="h-screen w-screen overflow-hidden">
            <div className="flex flex-col h-full">
              <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="h-6 w-6 text-primary" />
                  <h1 className="text-2xl font-bold">Yearly Goal Tracker</h1>
                </div>
                <div className="flex items-center">
                  <ThemeToggle />
                  <AccountButton />
                </div>
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