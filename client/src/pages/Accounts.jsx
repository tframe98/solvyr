import { useState } from 'react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const BankIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const SavingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const InvestmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Accounts = () => {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: 'Chase Checking',
      type: 'checking',
      balance: 8542.67,
      accountNumber: '****1234',
      institution: 'Chase Bank',
      color: 'bg-blue-500',
      icon: BankIcon,
      lastTransaction: '2024-01-15'
    },
    {
      id: 2,
      name: 'Wells Fargo Savings',
      type: 'savings',
      balance: 12450.00,
      accountNumber: '****5678',
      institution: 'Wells Fargo',
      color: 'bg-green-500',
      icon: SavingsIcon,
      lastTransaction: '2024-01-14'
    },
    {
      id: 3,
      name: 'Chase Credit Card',
      type: 'credit',
      balance: -1247.89,
      accountNumber: '****9012',
      institution: 'Chase Bank',
      color: 'bg-purple-500',
      icon: CreditCardIcon,
      lastTransaction: '2024-01-16'
    },
    {
      id: 4,
      name: 'Vanguard IRA',
      type: 'investment',
      balance: 45678.90,
      accountNumber: '****3456',
      institution: 'Vanguard',
      color: 'bg-orange-500',
      icon: InvestmentIcon,
      lastTransaction: '2024-01-13'
    }
  ]);

  const [showBalances, setShowBalances] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAccountTypeLabel = (type) => {
    const types = {
      checking: 'Checking',
      savings: 'Savings',
      credit: 'Credit Card',
      investment: 'Investment'
    };
    return types[type] || type;
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      checking: 'text-blue-400',
      savings: 'text-green-400',
      credit: 'text-purple-400',
      investment: 'text-orange-400'
    };
    return colors[type] || 'text-slate-400';
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

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
            <h1 className="text-3xl font-bold text-slate-100">Accounts</h1>
            <p className="text-slate-400 mt-2">Manage your bank accounts, credit cards, and investments</p>
          </div>
          <button className="btn btn-primary">
            <PlusIcon />
            <span className="ml-2">Add Account</span>
          </button>
        </motion.div>

        {/* Total Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-100">Total Balance</h2>
              <p className="text-slate-400 text-sm">Across all accounts</p>
            </div>
            <button
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center text-slate-400 hover:text-slate-300 transition-colors"
            >
              <EyeIcon />
              <span className="ml-2 text-sm">{showBalances ? 'Hide' : 'Show'} Balances</span>
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-slate-100 mb-2">
              {showBalances ? formatCurrency(totalBalance) : '••••••'}
            </div>
            <p className="text-slate-400 text-sm">
              {accounts.length} account{accounts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </motion.div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account, index) => {
            const IconComponent = account.icon;
            return (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-xl bg-slate-800/80 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${account.color} rounded-xl flex items-center justify-center mr-4`}>
                      <IconComponent />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100 mb-1">{account.name}</h3>
                      <p className="text-sm text-slate-400">{account.institution}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getAccountTypeColor(account.type)} bg-slate-700`}>
                    {getAccountTypeLabel(account.type)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">Balance</span>
                    <span className={`font-medium ${account.balance < 0 ? 'text-red-400' : 'text-slate-100'}`}>
                      {showBalances ? formatCurrency(account.balance) : '••••••'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-400">Account</span>
                    <span className="text-slate-300 font-mono">{account.accountNumber}</span>
                  </div>

                  <div className="flex justify-between text-sm pt-2">
                    <span className="text-slate-400">Last Activity</span>
                    <span className="text-slate-300">
                      {new Date(account.lastTransaction).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex space-x-2">
                  <button className="flex-1 btn btn-secondary text-xs py-2 flex items-center justify-center">
                    <EditIcon />
                    <span className="ml-1">Edit</span>
                  </button>
                  <button className="flex-1 btn btn-outline text-xs py-2 flex items-center justify-center">
                    <EyeIcon />
                    <span className="ml-1">Details</span>
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
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <BankIcon />
              </div>
              <p className="text-sm font-medium text-slate-100 text-center">Link Bank Account</p>
            </button>
            
            <button className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <CreditCardIcon />
              </div>
              <p className="text-sm font-medium text-slate-100 text-center">Add Credit Card</p>
            </button>
            
            <button className="p-4 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <InvestmentIcon />
              </div>
              <p className="text-sm font-medium text-slate-100 text-center">Connect Investment</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Accounts; 