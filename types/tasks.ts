export interface Task {
  id: string;
  title: string;
  isDaily: boolean;
  completed?: boolean; // Optional or required, depending on your use case
  amount?: number;
  category?: string;
  type?: 'expense' | 'income';
  date?: string;
}


export interface TaskCategory {
  id: string;
  name: string;
  color: string;
}