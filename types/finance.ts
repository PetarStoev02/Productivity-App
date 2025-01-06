export type Currency = 'BGN' | 'EUR';

export interface UserData {
  finances?: {
    balance: number;
    transactions: Transaction[];
  };
  stats?: {
    completedTasks: number;
    createdAt: string;
  };
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
}

export type NewTransaction = Omit<Transaction, 'id'>;

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  BGN: 'лв',
  EUR: '€'
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Заплата', type: 'income', color: 'emerald' },
  { id: '2', name: 'Свободна практика', type: 'income', color: 'blue' },
  { id: '3', name: 'Храна', type: 'expense', color: 'red' },
  { id: '4', name: 'Транспорт', type: 'expense', color: 'orange' },
  { id: '5', name: 'Забавления', type: 'expense', color: 'purple' },
  { id: '6', name: 'Сметки', type: 'expense', color: 'yellow' },
  { id: '7', name: 'Пазаруване', type: 'expense', color: 'pink' },
];