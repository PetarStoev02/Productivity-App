"use client";

import { useState, useEffect } from 'react';
import { Transaction, DEFAULT_CATEGORIES, Currency, CURRENCY_SYMBOLS } from '@/types/finance';

export function useFinances() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('transactions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('currency') as Currency) || 'BGN';
    }
    return 'BGN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', currency);
    }
  }, [currency]);

  const formatAmount = (amount: number) => {
    return `${amount.toFixed(2)} ${CURRENCY_SYMBOLS[currency]}`;
  };

  const addTransaction = (transaction: Transaction) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const getCategories = (type: 'income' | 'expense') => {
    return DEFAULT_CATEGORIES.filter(cat => cat.type === type);
  };

  const getBalance = () => {
    return transactions.reduce((acc, curr) => {
      return acc + (curr.type === 'income' ? curr.amount : -curr.amount);
    }, 0);
  };

  const getMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const monthlyTransactions = transactions.filter(t => 
      new Date(t.date).getMonth() === currentMonth
    );

    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    return { income, expenses, savingsRate };
  };

  return {
    transactions,
    currency,
    setCurrency,
    formatAmount,
    addTransaction,
    deleteTransaction,
    getCategories,
    getBalance,
    getMonthlyStats,
  };
}