import { useState } from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const FoodIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TransportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ShoppingIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const EntertainmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HealthIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Food & Dining',
      icon: FoodIcon,
      color: '#EF4444',
      monthlySpent: 847.50,
      monthlyBudget: 800,
      transactionCount: 23,
      type: 'expense'
    },
    {
      id: 2,
      name: 'Transportation',
      icon: TransportIcon,
      color: '#3B82F6',
      monthlySpent: 320.00,
      monthlyBudget: 400,
      transactionCount: 8,
      type: 'expense'
    },
    {
      id: 3,
      name: 'Shopping',
      icon: ShoppingIcon,
      color: '#8B5CF6',
      monthlySpent: 456.78,
      monthlyBudget: 500,
      transactionCount: 15,
      type: 'expense'
    },
    {
      id: 4,
      name: 'Entertainment',
      icon: EntertainmentIcon,
      color: '#F59E0B',
      monthlySpent: 180.00,
      monthlyBudget: 200,
      transactionCount: 6,
      type: 'expense'
    },
    {
      id: 5,
      name: 'Healthcare',
      icon: HealthIcon,
      color: '#10B981',
      monthlySpent: 125.00,
      monthlyBudget: 150,
      transactionCount: 3,
      type: 'expense'
    },
    {
      id: 6,
      name: 'Housing',
      icon: HomeIcon,
      color: '#F97316',
      monthlySpent: 1200.00,
      monthlyBudget: 1200,
      transactionCount: 2,
      type: 'expense'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressPercentage = (spent, budget) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const totalSpent = categories.reduce((sum, category) => sum + category.monthlySpent, 0);
  const totalBudget = categories.reduce((sum, category) => sum + category.monthlyBudget, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-[90vh] w-full max-w-7xl mx-auto bg-slate-800/80 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 lg:p-16 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Categories</h1>
            <p className="text-slate-400 mt-2">Organize and track your spending by category</p>
          </div>
          <button className="btn btn-primary">
            <PlusIcon />
            <span className="ml-2">Add Category</span>
          </button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mr-4">
                <ChartIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-slate-100">{formatCurrency(totalSpent)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mr-4">
                <ChartIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Budget</p>
                <p className="text-2xl font-bold text-slate-100">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mr-4">
                <ChartIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Categories</p>
                <p className="text-2xl font-bold text-slate-100">{categories.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const percentage = getProgressPercentage(category.monthlySpent, category.monthlyBudget);
            const progressColor = getProgressColor(percentage);
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.transactionCount} transactions</p>
                    </div>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">Spent</span>
                    <span className="text-slate-100 font-medium">{formatCurrency(category.monthlySpent)}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">Budget</span>
                    <span className="text-slate-100 font-medium">{formatCurrency(category.monthlyBudget)}</span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-300">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm pt-2">
                  <span className="text-slate-400">Remaining</span>
                  <span className={`font-medium ${category.monthlyBudget - category.monthlySpent < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {formatCurrency(category.monthlyBudget - category.monthlySpent)}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700 flex space-x-2">
                <button className="flex-1 btn btn-secondary text-xs py-2 flex items-center justify-center">
                  <EditIcon />
                  <span className="ml-1">Edit</span>
                </button>
                <button className="flex-1 btn btn-outline text-xs py-2">
                  View Transactions
                </button>
                <button className="btn btn-outline text-xs py-2 px-3 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                  <TrashIcon />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <PlusIcon />
            </div>
            <p className="text-sm font-medium text-slate-100 text-center">Create Category</p>
          </button>
          
          <button className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <ChartIcon />
            </div>
            <p className="text-sm font-medium text-slate-100 text-center">Category Analytics</p>
          </button>
          
          <button className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <EditIcon />
            </div>
            <p className="text-sm font-medium text-slate-100 text-center">Bulk Edit</p>
          </button>
        </div>
      </motion.div>
    </div>
  </div>
  );
};

export default Categories; 