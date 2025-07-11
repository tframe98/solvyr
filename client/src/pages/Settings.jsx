import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

// Custom SVG Icons
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AccountIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const PreferencesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Settings = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="min-h-[90vh] w-full max-w-7xl mx-auto bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl p-8 md:p-12 lg:p-16 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400 mt-2">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mr-4">
                <UserIcon />
              </div>
              <h2 className="text-xl font-semibold text-slate-100">Profile Settings</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.primaryEmailAddress?.emailAddress || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  value={user?.id || ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mr-4">
                <AccountIcon />
              </div>
              <h2 className="text-xl font-semibold text-slate-100">Account Settings</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Account Created
                </label>
                <input
                  type="text"
                  value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Last Sign In
                </label>
                <input
                  type="text"
                  value={user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleDateString() : ''}
                  readOnly
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mr-4">
                <PreferencesIcon />
              </div>
              <h2 className="text-xl font-semibold text-slate-100">Preferences</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-100">
                    Email Notifications
                  </label>
                  <p className="text-sm text-slate-400 mt-1">
                    Receive email notifications for important updates
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-slate-300 transition translate-x-1"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-100">
                    Dark Mode
                  </label>
                  <p className="text-sm text-slate-400 mt-1">
                    Use dark theme for the application
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-orange-500 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mr-4">
                <SecurityIcon />
              </div>
              <h2 className="text-xl font-semibold text-slate-100">Security</h2>
            </div>
            <div className="space-y-4">
              <button className="w-full btn btn-secondary py-3">
                Change Password
              </button>
              <button className="w-full btn btn-outline py-3">
                Enable Two-Factor Authentication
              </button>
              <button className="w-full btn btn-outline py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 