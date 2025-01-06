"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useFinances } from "@/hooks/useFinances";
import { CurrencyToggle } from "./CurrencyToggle";
import { useUser } from '@/contexts/UserContext';

interface UserData {
  finances?: {
    balance: number;
    transactions: any[];
  };
}

interface Props {
  userData: UserData | null;
}

export function FinanceOverview() {
  const { userData } = useUser();
  const { getBalance, getMonthlyStats, formatAmount } = useFinances();
  const balance = userData?.finances?.balance || 0;
  const { income, expenses, savingsRate } = getMonthlyStats();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CurrencyToggle />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общ Баланс</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(balance)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Месечни Приходи</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(income)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Месечни Разходи</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(expenses)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Спестявания</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}