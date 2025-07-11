const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Account endpoints
  async getAccounts() {
    return this.request('/accounts');
  }

  async getAccount(id) {
    return this.request(`/accounts/${id}`);
  }

  async createAccount(accountData) {
    return this.request('/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData)
    });
  }

  async updateAccount(id, accountData) {
    return this.request(`/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(accountData)
    });
  }

  async deleteAccount(id) {
    return this.request(`/accounts/${id}`, {
      method: 'DELETE'
    });
  }

  // Category endpoints
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(id) {
    return this.request(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    });
  }

  async updateCategory(id, categoryData) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    });
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE'
    });
  }

  // Transaction endpoints
  async getTransactions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/transactions?${queryString}`);
  }

  async getTransaction(id) {
    return this.request(`/transactions/${id}`);
  }

  async createTransaction(transactionData) {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData)
    });
  }

  async updateTransaction(id, transactionData) {
    return this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData)
    });
  }

  async deleteTransaction(id) {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE'
    });
  }

  // Budget endpoints
  async getBudgets() {
    return this.request('/budgets');
  }

  async getBudget(id) {
    return this.request(`/budgets/${id}`);
  }

  async getBudgetProgress(id) {
    return this.request(`/budgets/${id}/progress`);
  }

  async createBudget(budgetData) {
    return this.request('/budgets', {
      method: 'POST',
      body: JSON.stringify(budgetData)
    });
  }

  async updateBudget(id, budgetData) {
    return this.request(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(budgetData)
    });
  }

  async deleteBudget(id) {
    return this.request(`/budgets/${id}`, {
      method: 'DELETE'
    });
  }
}

export const api = new ApiService(); 