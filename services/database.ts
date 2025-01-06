import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import type { Transaction, NewTransaction } from '@/types/finance';

interface UserData {
  tasks?: any[];
  finances?: any;
  stats?: any;
}

export const saveUserData = async (userId: string, data: Partial<UserData>) => {
  try {
    await setDoc(doc(db, 'users', userId), data, { merge: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.exists() ? userDoc.data() : null;

    // Fetch transactions from subcollection
    const transactionsSnapshot = await getDocs(collection(db, `users/${userId}/transactions`));
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      ...userData,
      finances: {
        ...userData?.finances,
        transactions
      }
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const addTransaction = async (userId: string, transaction: NewTransaction) => {
  try {
    // Add to transactions subcollection
    const docRef = await addDoc(collection(db, `users/${userId}/transactions`), transaction);
    const newTransaction = { ...transaction, id: docRef.id };

    // Get current user data
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    
    // Calculate new balance
    const balanceChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
    const currentBalance = userData?.finances?.balance || 0;
    const newBalance = currentBalance + balanceChange;

    // Update user document with new transaction and balance
    await setDoc(doc(db, 'users', userId), {
      finances: {
        balance: newBalance,
        transactions: [...(userData?.finances?.transactions || []), newTransaction]
      }
    }, { merge: true });

    return docRef.id;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const getTransactions = async (userId: string) => {
  try {
    const snapshot = await getDocs(collection(db, `users/${userId}/transactions`));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const deleteTransaction = async (userId: string, transactionId: string) => {
  try {
    await deleteDoc(doc(db, `users/${userId}/transactions/${transactionId}`));
    
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    const transactions = userData?.finances?.transactions || [];
    const updatedTransactions = transactions.filter((t: { id: string }) => t.id !== transactionId);
    
    await setDoc(doc(db, 'users', userId), {
      finances: {
        ...userData?.finances,
        transactions: updatedTransactions
      }
    }, { merge: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}; 