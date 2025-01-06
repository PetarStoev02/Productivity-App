"use client";

import { FinanceOverview } from "@/components/finances/FinanceOverview";
import { TransactionList } from "@/components/finances/TransactionList";
import { ExpenseChart } from "@/components/finances/ExpenseChart";

export default function FinancesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Finance Tracker</h1>
      <FinanceOverview />
      <div className="grid lg:grid-cols-2 gap-6">
        <TransactionList />
        <ExpenseChart />
      </div>
    </div>
  );
}