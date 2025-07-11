import { create } from 'zustand';
import axios from 'axios';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  filteredTransactions: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    dateRange: { start: null, end: null },
    category: '',
    type: '',
    search: ''
  },

  // API base URL - adjust based on your backend
  apiBaseUrl: 'http://localhost:3001/api',

  // Fetch all transactions
  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get(`${get().apiBaseUrl}/transactions`);
      // const data = await response.data;
      
      // Mock data for now
      const mockTransactions = [
        {
          id: 1,
          description: 'Grocery Shopping',
          amount: 85.50,
          type: 'expense',
          category: { id: 1, name: 'Food & Dining', color: '#EF4444' },
          date: '2024-01-15',
          notes: 'Weekly groceries from Whole Foods',
          accountId: 1,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          description: 'Salary Deposit',
          amount: 2500.00,
          type: 'income',
          category: { id: 2, name: 'Salary', color: '#10B981' },
          date: '2024-01-14',
          notes: 'Monthly salary from employer',
          accountId: 1,
          createdAt: '2024-01-14T09:00:00Z',
          updatedAt: '2024-01-14T09:00:00Z'
        },
        {
          id: 3,
          description: 'Gas Station',
          amount: 45.00,
          type: 'expense',
          category: { id: 3, name: 'Transportation', color: '#3B82F6' },
          date: '2024-01-13',
          notes: 'Fuel for car',
          accountId: 1,
          createdAt: '2024-01-13T16:45:00Z',
          updatedAt: '2024-01-13T16:45:00Z'
        },
        {
          id: 4,
          description: 'Netflix Subscription',
          amount: 15.99,
          type: 'expense',
          category: { id: 4, name: 'Entertainment', color: '#F59E0B' },
          date: '2024-01-12',
          notes: 'Monthly streaming subscription',
          accountId: 1,
          createdAt: '2024-01-12T12:00:00Z',
          updatedAt: '2024-01-12T12:00:00Z'
        },
        {
          id: 5,
          description: 'Freelance Project',
          amount: 500.00,
          type: 'income',
          category: { id: 5, name: 'Freelance', color: '#8B5CF6' },
          date: '2024-01-11',
          notes: 'Web development project payment',
          accountId: 1,
          createdAt: '2024-01-11T14:20:00Z',
          updatedAt: '2024-01-11T14:20:00Z'
        },
        {
          id: 6,
          description: 'Restaurant Dinner',
          amount: 65.00,
          type: 'expense',
          category: { id: 1, name: 'Food & Dining', color: '#EF4444' },
          date: '2024-01-10',
          notes: 'Dinner with friends at Italian restaurant',
          accountId: 1,
          createdAt: '2024-01-10T19:30:00Z',
          updatedAt: '2024-01-10T19:30:00Z'
        }
      ];
      
      set({ 
        transactions: mockTransactions, 
        filteredTransactions: mockTransactions,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch categories
  fetchCategories: async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await axios.get(`${get().apiBaseUrl}/categories`);
      // const data = await response.data;
      
      // Mock categories
      const mockCategories = [
        { id: 1, name: 'Food & Dining', color: '#EF4444' },
        { id: 2, name: 'Salary', color: '#10B981' },
        { id: 3, name: 'Transportation', color: '#3B82F6' },
        { id: 4, name: 'Entertainment', color: '#F59E0B' },
        { id: 5, name: 'Freelance', color: '#8B5CF6' },
        { id: 6, name: 'Shopping', color: '#EC4899' },
        { id: 7, name: 'Healthcare', color: '#14B8A6' },
        { id: 8, name: 'Housing', color: '#F97316' }
      ];
      
      set({ categories: mockCategories });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  // Add new transaction
  addTransaction: async (transactionData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post(`${get().apiBaseUrl}/transactions`, transactionData);
      // const newTransaction = await response.data;
      
      // Mock new transaction creation
      const newTransaction = {
        id: Date.now(),
        ...transactionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      set(state => {
        const updatedTransactions = [...state.transactions, newTransaction];
        return {
          transactions: updatedTransactions,
          filteredTransactions: get().applyFilters(updatedTransactions, state.filters),
          loading: false
        };
      });
      
      return newTransaction;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update existing transaction
  updateTransaction: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await axios.put(`${get().apiBaseUrl}/transactions/${id}`, updates);
      // const updatedTransaction = await response.data;
      
      // Mock transaction update
      set(state => {
        const updatedTransactions = state.transactions.map(transaction =>
          transaction.id === id
            ? { ...transaction, ...updates, updatedAt: new Date().toISOString() }
            : transaction
        );
        return {
          transactions: updatedTransactions,
          filteredTransactions: get().applyFilters(updatedTransactions, state.filters),
          loading: false
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // await axios.delete(`${get().apiBaseUrl}/transactions/${id}`);
      
      // Mock transaction deletion
      set(state => {
        const updatedTransactions = state.transactions.filter(transaction => transaction.id !== id);
        return {
          transactions: updatedTransactions,
          filteredTransactions: get().applyFilters(updatedTransactions, state.filters),
          loading: false
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Apply filters to transactions
  applyFilters: (transactions, filters) => {
    let filtered = [...transactions];

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(transaction => 
        transaction.category.id.toString() === filters.category
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(transaction => 
        transaction.type === filters.type
      );
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.notes?.toLowerCase().includes(searchTerm) ||
        transaction.category.name.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  },

  // Update filters
  updateFilters: (newFilters) => {
    set(state => {
      const updatedFilters = { ...state.filters, ...newFilters };
      const filteredTransactions = get().applyFilters(state.transactions, updatedFilters);
      return {
        filters: updatedFilters,
        filteredTransactions
      };
    });
  },

  // Clear all filters
  clearFilters: () => {
    set(state => ({
      filters: {
        dateRange: { start: null, end: null },
        category: '',
        type: '',
        search: ''
      },
      filteredTransactions: state.transactions
    }));
  },

  // Get transaction by ID
  getTransactionById: (id) => {
    const state = get();
    return state.transactions.find(transaction => transaction.id === id);
  },

  // Get transaction statistics
  getTransactionStats: () => {
    const state = get();
    const transactions = state.filteredTransactions;
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const netAmount = totalIncome - totalExpenses;
    
    return {
      totalIncome,
      totalExpenses,
      netAmount,
      transactionCount: transactions.length
    };
  },

  // Clear error
  clearError: () => set({ error: null })
}));

export default useTransactionStore; 