"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/Favicon Icon.png";

export function PublicNavbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src={logo} alt="Logo" className="h-8 w-8 " />
            <div>
              <h1 className="text-xl font-bold">Productiven</h1>
              <p className="text-xs text-muted-foreground">
                Track. Achieve. Succeed.
              </p>
            </div>
          </div>

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
