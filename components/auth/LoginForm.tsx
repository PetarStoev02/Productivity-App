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
import { getUserData } from '@/services/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useUser } from '@/contexts/UserContext';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { refreshUserData } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    // Form validation
    if (!email || !password) {
      toast({
        title: "Грешка при вход",
        description: "Моля, попълнете всички полета",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Грешка при вход",
        description: "Моля, въведете валиден имейл адрес",
        variant: "destructive",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await refreshUserData();
      router.replace('/dashboard');
    } catch (error: any) {
      const errorMessage = getAuthError(error);
      
      toast({
        title: "Грешка при вход",
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