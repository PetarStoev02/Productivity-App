"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { getAuthError } from "@/utils/auth-errors";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { email, password } = formData;
      await login({ email, password });
      
      toast({
        title: "Успешен вход",
        description: "Добре дошли отново!",
      });
      
      // Add a small delay before navigation
      setTimeout(() => {
        router.replace('/dashboard');
      }, 100);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage;
      switch (error?.code) {
        case 'auth/invalid-email':
          errorMessage = 'Невалиден имейл адрес';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Невалиден имейл или парола';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Твърде много опити. Моля, опитайте по-късно';
          break;
        default:
          errorMessage = 'Възникна грешка. Моля, опитайте отново';
      }

      toast({
        title: "Грешка при влизане",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Имейл</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Парола</Label>
        <PasswordInput
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Вход
      </Button>
    </form>
  );
}