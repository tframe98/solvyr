import { SignIn, SignUp } from '@clerk/clerk-react';

const ClerkAuth = ({ mode = 'sign-in' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            {mode === 'sign-in' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          {mode === 'sign-in' && (
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
              Or{' '}
              <a
                href="/sign-up"
                className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
              >
                create a new account
              </a>
            </p>
          )}
          {mode === 'sign-up' && (
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
              Or{' '}
              <a
                href="/sign-in"
                className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
              >
                sign in to your account
              </a>
            </p>
          )}
        </div>
        
        {/* Password Requirements Hint for Sign Up */}
        {mode === 'sign-up' && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
              Password Requirements:
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include at least one number</li>
              <li>• Include at least one special character</li>
              <li>• Avoid common words and patterns</li>
              <li>• Use unique, uncommon words</li>
            </ul>
          </div>
        )}
        
        <div className="mt-8">
          {mode === 'sign-in' ? (
            <SignIn 
              path="/sign-in"
              appearance={{
                elements: {
                  formButtonPrimary: 'btn btn-primary w-full',
                  card: 'card dark:bg-slate-800 dark:border-slate-700',
                  headerTitle: 'text-lg font-semibold text-slate-900 dark:text-slate-100',
                  headerSubtitle: 'text-sm text-slate-600 dark:text-slate-400',
                  socialButtonsBlockButton: 'btn btn-secondary w-full mb-2',
                  formFieldInput: 'form-input',
                  formFieldLabel: 'form-label',
                  footerActionLink: 'font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300',
                  formFieldError: 'text-red-500 text-sm mt-1',
                  alert: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-md text-sm'
                }
              }}
              redirectUrl="/dashboard"
              routing="path"
            />
          ) : (
            <SignUp 
              path="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: 'btn btn-primary w-full',
                  card: 'card dark:bg-slate-800 dark:border-slate-700',
                  headerTitle: 'text-lg font-semibold text-slate-900 dark:text-slate-100',
                  headerSubtitle: 'text-sm text-slate-600 dark:text-slate-400',
                  socialButtonsBlockButton: 'btn btn-secondary w-full mb-2',
                  formFieldInput: 'form-input',
                  formFieldLabel: 'form-label',
                  footerActionLink: 'font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300',
                  formFieldError: 'text-red-500 text-sm mt-1',
                  alert: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-md text-sm',
                  passwordInput: 'form-input',
                  passwordRequirements: 'text-xs text-slate-500 dark:text-slate-400 mt-1'
                }
              }}
              redirectUrl="/dashboard"
              routing="path"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClerkAuth; 