import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import solvyrLogo from '../assets/solvyrlogo.png';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-slate-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={solvyrLogo} alt="Solvyr Logo" className="w-8 h-8 mr-2" />
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Solvyr</span>
            </Link>
          </div>

          {/* Navigation for signed-in users */}
          <SignedIn>
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/dashboard"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/transactions"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Transactions
              </Link>
              <Link
                to="/accounts"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Accounts
              </Link>
              <Link
                to="/budgets"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Budgets
              </Link>
            </nav>
          </SignedIn>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-primary">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <DarkModeToggle />
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                                      userButtonPopoverCard: "shadow-lg border border-slate-200 dark:border-gray-700 dark:bg-gray-900",
                  userButtonPopoverActionButton: "hover:bg-slate-50 dark:hover:bg-gray-800"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 