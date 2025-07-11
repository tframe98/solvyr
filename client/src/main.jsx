import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

// Force dark mode by default
if (!document.documentElement.classList.contains('dark')) {
  document.documentElement.classList.add('dark');
}

// Import your Publishable Key
const clerkPubKey = 'pk_test_c2luY2VyZS1mb3dsLTg0LmNsZXJrLmFjY291bnRzLmRldiQ'

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl='/'>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
