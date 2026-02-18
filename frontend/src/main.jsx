import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { AuthProvider } from './auth/authContext.jsx'
import { ToastProvider } from './components/Toast.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
)
