import { create } from 'zustand';
import { useUser } from '@clerk/clerk-react';

const useBudgetStore = create((set, get) => ({
  budgets: [],
  loading: false,
  error: null,

  // Fetch budgets from backend
  fetchBudgets: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/budgets', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      
      // Mock data for now
      const mockBudgets = [
        {
          id: 1,
          name: 'Food & Dining',
          monthlyLimit: 800,
          spent: 647.50,
          color: '#EF4444',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15'
        },
        {
          id: 2,
          name: 'Entertainment',
          monthlyLimit: 200,
          spent: 180.00,
          color: '#F59E0B',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-14'
        },
        {
          id: 3,
          name: 'Transportation',
          monthlyLimit: 400,
          spent: 320.00,
          color: '#3B82F6',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-13'
        },
        {
          id: 4,
          name: 'Shopping',
          monthlyLimit: 500,
          spent: 456.78,
          color: '#8B5CF6',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-12'
        }
      ];
      
      set({ budgets: mockBudgets, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add new budget
  addBudget: async (budgetData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/budgets', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(budgetData)
      // });
      // const newBudget = await response.json();
      
      // Mock new budget creation
      const newBudget = {
        id: Date.now(),
        ...budgetData,
        spent: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      set(state => ({
        budgets: [...state.budgets, newBudget],
        loading: false
      }));
      
      return newBudget;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update existing budget
  updateBudget: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/budgets/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(updates)
      // });
      // const updatedBudget = await response.json();
      
      // Mock budget update
      set(state => ({
        budgets: state.budgets.map(budget =>
          budget.id === id
            ? { ...budget, ...updates, updatedAt: new Date().toISOString() }
            : budget
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete budget
  deleteBudget: async (id) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/budgets/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // Mock budget deletion
      set(state => ({
        budgets: state.budgets.filter(budget => budget.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update spent amount (called when transactions are added)
  updateSpent: async (budgetId, amount) => {
    set(state => ({
      budgets: state.budgets.map(budget =>
        budget.id === budgetId
          ? { ...budget, spent: budget.spent + amount, updatedAt: new Date().toISOString() }
          : budget
      )
    }));
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Get budget by ID
  getBudgetById: (id) => {
    const state = get();
    return state.budgets.find(budget => budget.id === id);
  },

  // Get total budget usage
  getTotalUsage: () => {
    const state = get();
    const totalLimit = state.budgets.reduce((sum, budget) => sum + budget.monthlyLimit, 0);
    const totalSpent = state.budgets.reduce((sum, budget) => sum + budget.spent, 0);
    return { totalLimit, totalSpent, percentage: totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0 };
  }
}));

export default useBudgetStore; 