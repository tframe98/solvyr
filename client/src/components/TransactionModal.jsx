import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTransactionStore from '../stores/transactionStore';

const TransactionModal = ({ isOpen, onClose, transaction = null, onSave }) => {
  const { categories } = useTransactionStore();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    accountId: 1 // Default account ID
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount.toString(),
        type: transaction.type,
        categoryId: transaction.category.id.toString(),
        date: transaction.date,
        notes: transaction.notes || '',
        accountId: transaction.accountId
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        categoryId: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        accountId: 1
      });
    }
    setErrors({});
  }, [transaction, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Amount must be a positive number';
      }
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const transactionData = {
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        type: formData.type,
        categoryId: parseInt(formData.categoryId),
        date: formData.date,
        notes: formData.notes.trim(),
        accountId: formData.accountId
      };
      
      onSave(transactionData);
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">
              {transaction ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Transaction Type
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'expense')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    formData.type === 'expense'
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'income')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                    formData.type === 'income'
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : 'border-slate-600 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.description ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="e.g., Grocery shopping"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 bg-slate-700 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.amount ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.amount && (
                <p className="text-red-400 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.categoryId ? 'border-red-500' : 'border-slate-600'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-red-400 text-sm mt-1">{errors.categoryId}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.date ? 'border-red-500' : 'border-slate-600'
                }`}
              />
              {errors.date && (
                <p className="text-red-400 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-slate-300 bg-slate-700 border border-slate-600 rounded-xl hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 text-white bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                {transaction ? 'Update Transaction' : 'Add Transaction'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionModal; 