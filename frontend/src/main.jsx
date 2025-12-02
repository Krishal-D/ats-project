import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { AuthProvider } from './auth/authContext.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
