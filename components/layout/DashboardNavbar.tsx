"use client";

import { CalendarCheck2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccountButton } from "@/components/AccountButton";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/contexts/UserContext';

export function DashboardNavbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { userData } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Успешно излизане",
        description: "Довиждане!",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Грешка",
        description: "Възникна проблем при излизане",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="flex items-center justify-between p-20 border-b bg-background h-16">
      <div className="flex items-center gap-2">
        <CalendarCheck2 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Goal Tracker</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AccountButton />
        <nav className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto flex items-center space-x-4">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Изход
              </Button>
            </div>
          </div>
        </nav>
      </div>
      <div>Tasks: {userData?.stats?.completedTasks || 0}</div>
      <div>Balance: ${userData?.finances?.balance || 0}</div>
    </header>
  );
}
