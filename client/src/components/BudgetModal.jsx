import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BudgetModal = ({ isOpen, onClose, budget = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    monthlyLimit: '',
    color: '#EF4444'
  });
  const [errors, setErrors] = useState({});

  const colors = [
    '#EF4444', '#3B82F6', '#8B5CF6', '#F59E0B', 
    '#10B981', '#F97316', '#06B6D4', '#84CC16',
    '#EC4899', '#A855F7', '#14B8A6', '#F43F5E'
  ];

  useEffect(() => {
    if (budget) {
      setFormData({
        name: budget.name,
        monthlyLimit: budget.monthlyLimit.toString(),
        color: budget.color
      });
    } else {
      setFormData({
        name: '',
        monthlyLimit: '',
        color: '#EF4444'
      });
    }
    setErrors({});
  }, [budget, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Budget name is required';
    }

    if (!formData.monthlyLimit) {
      newErrors.monthlyLimit = 'Monthly limit is required';
    } else {
      const limit = parseFloat(formData.monthlyLimit);
      if (isNaN(limit) || limit <= 0) {
        newErrors.monthlyLimit = 'Monthly limit must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const budgetData = {
        name: formData.name.trim(),
        monthlyLimit: parseFloat(formData.monthlyLimit),
        color: formData.color
      };
      
      onSave(budgetData);
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
          className="relative bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-100">
              {budget ? 'Edit Budget' : 'Add New Budget'}
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
            {/* Budget Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Budget Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                  errors.name ? 'border-red-500' : 'border-slate-600'
                }`}
                placeholder="e.g., Food & Dining"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Monthly Limit */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Monthly Limit
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  value={formData.monthlyLimit}
                  onChange={(e) => handleInputChange('monthlyLimit', e.target.value)}
                  className={`w-full pl-8 pr-4 py-3 bg-slate-700 border rounded-xl text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
                    errors.monthlyLimit ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.monthlyLimit && (
                <p className="text-red-400 text-sm mt-1">{errors.monthlyLimit}</p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Color
              </label>
              <div className="grid grid-cols-6 gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      formData.color === color
                        ? 'border-white scale-110'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
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
                {budget ? 'Update Budget' : 'Create Budget'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BudgetModal; 