import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client  = new QueryClient(
  {
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false
      }
    }
  }
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)

