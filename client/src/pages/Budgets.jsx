import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBudgetStore from '../stores/budgetStore';
import BudgetModal from '../components/BudgetModal';

// Custom SVG Icons
const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDownIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const Budgets = () => {
  const { user } = useUser();
  const {
    budgets,
    loading,
    error,
    fetchBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
    getTotalUsage,
    clearError
  } = useBudgetStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleAddBudget = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await deleteBudget(budgetId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleSaveBudget = async (budgetData) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget.id, budgetData);
      } else {
        await addBudget(budgetData);
      }
    } catch (error) {
      console.error('Error saving budget:', error);
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressTextColor = (percentage) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 75) return 'text-orange-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-green-400';
  };

  const totalUsage = getTotalUsage();

  if (loading && budgets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading budgets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-[90vh] w-full max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 lg:p-16 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Budgets</h1>
            <p className="text-slate-400 mt-2">Manage your monthly spending limits and track your progress.</p>
          </div>
          <button
            onClick={handleAddBudget}
            className="inline-flex items-center px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
          >
            <PlusIcon />
            <span className="ml-2">Add Budget</span>
          </button>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-500/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Total Budget Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mr-4">
              <ChartIcon />
            </div>
            <h2 className="text-xl font-semibold text-slate-100">Total Budget Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-slate-100">{formatCurrency(totalUsage.totalLimit)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-orange-500">{formatCurrency(totalUsage.totalSpent)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-1">Usage</p>
              <p className={`text-2xl font-bold ${getProgressTextColor(totalUsage.percentage)}`}>
                {totalUsage.percentage.toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Progress</span>
              <span>{formatCurrency(totalUsage.totalSpent)} / {formatCurrency(totalUsage.totalLimit)}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(totalUsage.percentage)}`}
                style={{ width: `${Math.min(totalUsage.percentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.monthlyLimit) * 100;
              const remaining = budget.monthlyLimit - budget.spent;
              
              return (
                <motion.div
                  key={budget.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: budget.color }}
                      ></div>
                      <h3 className="font-semibold text-slate-100">{budget.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditBudget(budget)}
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(budget.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(percentage)}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Limit:</span>
                      <span className="text-slate-100 font-medium">{formatCurrency(budget.monthlyLimit)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Spent:</span>
                      <span className="text-orange-400 font-medium">{formatCurrency(budget.spent)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Remaining:</span>
                      <span className={`font-medium ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(Math.abs(remaining))}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Status</span>
                      <div className="flex items-center">
                        {percentage >= 90 ? (
                          <TrendingDownIcon className="w-4 h-4 text-red-400" />
                        ) : percentage >= 75 ? (
                          <TrendingDownIcon className="w-4 h-4 text-orange-400" />
                        ) : (
                          <TrendingUpIcon className="w-4 h-4 text-green-400" />
                        )}
                        <span className={`text-xs ml-1 ${
                          percentage >= 90 ? 'text-red-400' :
                          percentage >= 75 ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {percentage >= 90 ? 'Over Budget' :
                           percentage >= 75 ? 'Warning' : 'On Track'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {budgets.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartIcon />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">No budgets yet</h3>
            <p className="text-slate-400 mb-6">Create your first budget to start tracking your spending.</p>
            <button
              onClick={handleAddBudget}
              className="inline-flex items-center px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
            >
              <PlusIcon />
              <span className="ml-2">Create Budget</span>
            </button>
          </motion.div>
        )}

        {/* Budget Modal */}
        <BudgetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          budget={editingBudget}
          onSave={handleSaveBudget}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowDeleteConfirm(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
              >
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Delete Budget</h3>
                <p className="text-slate-400 mb-6">
                  Are you sure you want to delete this budget? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 text-slate-300 bg-slate-700 border border-slate-600 rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteBudget(showDeleteConfirm)}
                    className="flex-1 px-4 py-3 text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Budgets; 