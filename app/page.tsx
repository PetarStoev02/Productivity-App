"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle2, Calendar } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* Header Section */}
      <header className="w-full  shadow-md sticky top-0 z-10">
        <nav className="container mx-auto flex items-center justify-between p-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Productivity<span className="text-gray-500">App</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gray-700 hover:bg-gray-600 text-white">
                Register
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold mb-6">Elevate Your Productivity</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
          Discover a smarter way to manage tasks, set goals, and track progress.
          Make every moment count.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register">
            <Button className="px-10 py-4 text-lg bg-gray-700 text-white hover:bg-gray-600 shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/features">
            <Button
              variant="outline"
              className="px-10 py-4 text-lg text-gray-400 border-gray-600 hover:bg-neutral-800"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </section>

     

      {/* Footer Section */}
      <footer className="w-full bg-neutral-900 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 ProductivityApp. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy" className="text-gray-500 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
