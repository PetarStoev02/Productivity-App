"use client";

import { CalendarCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/Favicon Icon.png"

export function LandingNavbar() {
  const router = useRouter();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <Image src={logo} alt="Logo" className="h-8 w-8 " />
            <div>
              <h1 className="text-xl font-bold">Productiven</h1>
              <p className="text-xs text-muted-foreground">Track. Achieve. Succeed.</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Sign In
              </Button>
              <Button onClick={() => router.push("/register")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}