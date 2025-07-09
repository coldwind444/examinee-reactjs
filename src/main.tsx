import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthContext.tsx'
import { UserProvider } from './providers/UserContext.tsx'
import { AppProvider } from './providers/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
