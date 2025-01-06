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
import { saveUserData } from '@/services/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    // Form validation
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Грешка при регистрация",
        description: "Моля, попълнете всички полета",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Грешка при регистрация",
        description: "Моля, въведете валиден имейл адрес",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Грешка при регистрация",
        description: "Паролата трябва да бъде поне 6 символа",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Грешка при регистрация",
        description: "Паролите не съвпадат",
        variant: "destructive",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Initialize user data in Firestore
      await saveUserData(userCredential.user.uid, {
        tasks: [],
        finances: {
          balance: 0,
          transactions: []
        },
        stats: {
          completedTasks: 0,
          createdAt: new Date().toISOString()
        }
      });

      toast({
        title: "Успешна регистрация",
        description: "Добре дошли!",
      });

      router.push('/dashboard');
    } catch (error: any) {
      const errorMessage = getAuthError(error);
      
      toast({
        title: "Грешка при регистрация",
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Потвърди парола</Label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Регистрация
      </Button>
    </form>
  );
}