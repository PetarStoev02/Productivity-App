"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, Trash2 } from "lucide-react";
import { useFinances } from "@/hooks/useFinances";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { format } from "date-fns";

export function TransactionList() {
  const { transactions, deleteTransaction, formatAmount } = useFinances();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Последни Транзакции</CardTitle>
        <AddTransactionDialog />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatAmount(Math.abs(transaction.amount))}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              Все още няма транзакции. Добавете първата!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}