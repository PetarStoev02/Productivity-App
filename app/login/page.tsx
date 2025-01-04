"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2">
            <CalendarCheck2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Вход</h1>
          </div>
          
          <LoginForm />
          
          <p className="text-sm text-muted-foreground">
            Нямате акаунт?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Регистрирайте се
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}