import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import useTransactionStore from '../stores/transactionStore';
import TransactionModal from '../components/TransactionModal';

// Custom SVG Icons
const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
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

const Transactions = () => {
  const { user } = useUser();
  const {
    filteredTransactions,
    categories,
    loading,
    error,
    filters,
    fetchTransactions,
    fetchCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateFilters,
    clearFilters,
    getTransactionStats,
    clearError
  } = useTransactionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [fetchTransactions, fetchCategories]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleSaveTransaction = async (transactionData) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, transactionData);
      } else {
        await addTransaction(transactionData);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleSearchChange = (value) => {
    updateFilters({ search: value });
  };

  const handleFilterChange = (filterType, value) => {
    updateFilters({ [filterType]: value });
  };

  const handleDateRangeChange = (start, end) => {
    updateFilters({ dateRange: { start, end } });
  };

  const stats = getTransactionStats();

  if (loading && filteredTransactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-[90vh] w-full max-w-7xl mx-auto bg-slate-800/80 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 lg:p-16 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Transactions</h1>
            <p className="text-slate-400 mt-2">Track your income and expenses with detailed records.</p>
          </div>
          <button
            onClick={handleAddTransaction}
            className="inline-flex items-center px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
          >
            <PlusIcon />
            <span className="ml-2">Add Transaction</span>
          </button>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
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

        {/* Transaction Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mr-3">
                <TrendingUpIcon />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Income</p>
                <p className="text-xl font-bold text-green-500">{formatCurrency(stats.totalIncome)}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mr-3">
                <TrendingDownIcon />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Expenses</p>
                <p className="text-xl font-bold text-red-500">{formatCurrency(stats.totalExpenses)}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Net Amount</p>
                <p className={`text-xl font-bold ${stats.netAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(stats.netAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Transactions</p>
                <p className="text-xl font-bold text-slate-100">{stats.transactionCount}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 flex items-center">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                  <SearchIcon className="text-slate-400" />
                </span>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all h-12"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 h-12 bg-slate-700 border border-slate-600 rounded-xl text-slate-300 hover:bg-slate-600 transition-colors font-medium"
            >
              <FilterIcon />
              <span className="ml-2">Filters</span>
            </button>

            {/* Clear Filters */}
            {(filters.category || filters.type || filters.dateRange.start || filters.dateRange.end) && (
              <button
                onClick={clearFilters}
                className="px-4 h-12 text-slate-300 bg-slate-700 border border-slate-600 rounded-xl hover:bg-slate-600 transition-colors font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-slate-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="">All Types</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={filters.dateRange.start || ''}
                        onChange={(e) => handleDateRangeChange(e.target.value, filters.dateRange.end)}
                        className="px-3 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                      />
                      <input
                        type="date"
                        value={filters.dateRange.end || ''}
                        onChange={(e) => handleDateRangeChange(filters.dateRange.start, e.target.value)}
                        className="px-3 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Transactions List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: transaction.category.color }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-slate-100 mb-1">{transaction.description}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>{transaction.category.name}</span>
                        <span>•</span>
                        <span>{formatDate(transaction.date)}</span>
                        {transaction.notes && (
                          <>
                            <span>•</span>
                            <span className="max-w-xs truncate">{transaction.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`font-semibold text-lg ${
                        transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-slate-400 capitalize">{transaction.type}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(transaction.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredTransactions.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-12 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">No transactions found</h3>
              <p className="text-slate-400 mb-6">
                {filters.search || filters.category || filters.type || filters.dateRange.start
                  ? 'Try adjusting your filters or search terms.'
                  : 'Add your first transaction to get started.'}
              </p>
              {!filters.search && !filters.category && !filters.type && !filters.dateRange.start && (
                <button
                  onClick={handleAddTransaction}
                  className="inline-flex items-center px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  <PlusIcon />
                  <span className="ml-2">Add Transaction</span>
                </button>
              )}
            </motion.div>
          )}
        </div>

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={editingTransaction}
          onSave={handleSaveTransaction}
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
                <h3 className="text-lg font-semibold text-slate-100 mb-4">Delete Transaction</h3>
                <p className="text-slate-400 mb-6">
                  Are you sure you want to delete this transaction? This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 text-slate-300 bg-slate-700 border border-slate-600 rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(showDeleteConfirm)}
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

export default Transactions; 