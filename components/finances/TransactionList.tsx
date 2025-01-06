"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, Trash2 } from "lucide-react";
import { useFinances } from "@/hooks/useFinances";
import { AddTransactionDialog } from "./AddTransactionDialog";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useUser } from '@/contexts/UserContext';
import { deleteTransaction as deleteTransactionFromDb } from '@/services/database';
import { db, auth } from '@/lib/firebase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Transaction } from '@/types/finance';

interface UserData {
  finances?: {
    balance: number;
    transactions: any[];
  };
}

interface Props {
  userData: UserData | null;
}

export function TransactionList() {
  const { userData, refreshUserData } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { formatAmount } = useFinances();
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.finances?.transactions) {
      setTransactions(userData.finances.transactions);
    }
  }, [userData]);

  const handleDeleteTransaction = async (id: string) => {
    try {
      if (!auth.currentUser?.uid || !userData) return;
      
      const transactionToDelete = transactions.find(transaction => transaction.id === id);
      if (!transactionToDelete) return;

      await deleteTransactionFromDb(auth.currentUser.uid, id);
      await refreshUserData();

      // Update balance after deletion
      const newBalance = userData.finances?.balance || 0 - transactionToDelete.amount;
      // updateUserBalance(newBalance);

      setTransactions((prevTransactions) => 
        prevTransactions.filter(transaction => transaction.id !== id)
      );
      
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-center justify-between">
          <CardTitle>Последни Транзакции</CardTitle>
          <AddTransactionDialog />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200 group flex-wrap"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpIcon className="h-5 w-5" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{transaction.title}</p>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-bold text-xl ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(Math.abs(transaction.amount))}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => setTransactionToDelete(transaction.id)}
                  >
                    <Trash2 className="h-5 w-5" />
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

      <AlertDialog open={!!transactionToDelete} onOpenChange={() => setTransactionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => transactionToDelete && handleDeleteTransaction(transactionToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}