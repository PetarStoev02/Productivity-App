"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
//   const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Грешка",
        description: "Паролите не съвпадат",
        variant: "destructive",
      });
      return;
    }

    try {
    //   await register(formData);
      router.push("/");
    } catch (error) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при регистрацията",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Име</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Вашето име"
        />
      </div>

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
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Потвърди парола</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
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