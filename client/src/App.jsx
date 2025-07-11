import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ClerkAuth from './components/ClerkAuth';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import Budgets from './pages/Budgets';
import Accounts from './pages/Accounts';
import Categories from './pages/Categories';

// Main App Routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/sign-in" element={<ClerkAuth mode="sign-in" />} />
      <Route path="/sign-up" element={<ClerkAuth mode="sign-up" />} />
      
      {/* Landing page for signed-out users */}
      <Route
        path="/"
        element={
          <>
            <SignedOut>
              <Landing />
            </SignedOut>
            <SignedIn>
              <Navigate to="/dashboard" replace />
            </SignedIn>
          </>
        }
      />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Layout>
              <Transactions />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Placeholder routes for future implementation */}
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Layout>
              <Accounts />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Layout>
              <Categories />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/budgets"
        element={
          <ProtectedRoute>
            <Layout>
              <Budgets />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
