import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';
import solvyrLogo from '../assets/solvyrlogo.png';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with real data from your backend
  const monthlyData = [
    { month: 'Jan', income: 4500, expenses: 3200 },
    { month: 'Feb', income: 4800, expenses: 3400 },
    { month: 'Mar', income: 5200, expenses: 3100 },
    { month: 'Apr', income: 4900, expenses: 3600 },
    { month: 'May', income: 5500, expenses: 3300 },
    { month: 'Jun', income: 5100, expenses: 3500 },
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 850, color: '#8B5CF6' },
    { name: 'Transportation', value: 650, color: '#06B6D4' },
    { name: 'Entertainment', value: 450, color: '#10B981' },
    { name: 'Shopping', value: 750, color: '#F59E0B' },
    { name: 'Utilities', value: 400, color: '#EF4444' },
    { name: 'Healthcare', value: 300, color: '#EC4899' },
  ];

  const budgetData = [
    { category: 'Food', budget: 1000, actual: 850 },
    { category: 'Transport', budget: 800, actual: 650 },
    { category: 'Entertainment', budget: 500, actual: 450 },
    { category: 'Shopping', budget: 600, actual: 750 },
    { category: 'Utilities', budget: 400, actual: 400 },
  ];

  const recentTransactions = [
    { id: 1, description: 'Grocery Store', amount: -85.50, category: 'Food', date: '2024-01-15' },
    { id: 2, description: 'Salary Deposit', amount: 2500.00, category: 'Income', date: '2024-01-14' },
    { id: 3, description: 'Gas Station', amount: -45.00, category: 'Transport', date: '2024-01-13' },
    { id: 4, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-01-12' },
    { id: 5, description: 'Coffee Shop', amount: -8.50, category: 'Food', date: '2024-01-11' },
  ];

  const totalIncome = monthlyData[monthlyData.length - 1].income;
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses;
  const netSavings = totalIncome - totalExpenses;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
          <p className="text-white/90 font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-white/80" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl">
          <p className="text-white/90 font-medium">{payload[0].name}</p>
          <p className="text-white/80">${payload[0].value.toLocaleString()}</p>
        </div>   
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-[90vh] w-full max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 lg:p-16 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start justify-start"
        >
          <h1 className="text-4xl font-bold text-white mb-2 inline-block align-middle">Dashboard</h1>
          <p className="text-slate-400">Track your financial journey with precision</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Income</p>
                <p className="text-3xl font-bold text-emerald-400">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Expenses</p>
                <p className="text-3xl font-bold text-rose-400">${totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-rose-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Net Savings</p>
                <p className={`text-3xl font-bold ${netSavings >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${netSavings.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Income vs Expenses Trend */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Income vs Expenses Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.6)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fill="url(#incomeGradient)"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  fill="url(#expenseGradient)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Expenses by Category */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-slate-300">{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget vs Actual */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Budget vs Actual</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="category" 
                  stroke="rgba(255,255,255,0.6)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="budget" 
                  fill="rgba(59, 130, 246, 0.6)" 
                  radius={[4, 4, 0, 0]}
                  stroke="rgba(59, 130, 246, 0.8)"
                  strokeWidth={1}
                />
                <Bar 
                  dataKey="actual" 
                  fill="rgba(16, 185, 129, 0.6)" 
                  radius={[4, 4, 0, 0]}
                  stroke="rgba(16, 185, 129, 0.8)"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white mb-6">Recent Transactions</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {recentTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-600/30 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-slate-400 text-sm">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <p className="text-slate-400 text-sm">{transaction.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 