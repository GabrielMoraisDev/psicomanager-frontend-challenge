import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/global.ts';
import { BankProvider } from './contexts/BankContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BankProvider>
      <GlobalStyle />
      <App />
    </BankProvider>
  </StrictMode>,
)
