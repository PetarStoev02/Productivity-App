"use client";

import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-2">
            <CalendarCheck2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Регистрация</h1>
          </div>
          
          <RegisterForm />
          
          <p className="text-sm text-muted-foreground">
            Вече имате акаунт?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Влезте
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}