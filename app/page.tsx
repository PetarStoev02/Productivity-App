"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CalendarCheck2, Target, LineChart, Clock } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-20 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <CalendarCheck2 className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Yearly Goal Tracker</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Track your goals, manage finances, and achieve more throughout the year
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => router.push("/register")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/login")}>
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg border bg-card">
            <Target className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Goal Tracking</h3>
            <p className="text-muted-foreground">
              Set and track your daily, weekly, and yearly goals with our intuitive calendar interface
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <LineChart className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Finance Management</h3>
            <p className="text-muted-foreground">
              Keep track of your income, expenses, and savings with detailed charts and analytics
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <Clock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Monitor your progress with statistics and visualizations to stay motivated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}