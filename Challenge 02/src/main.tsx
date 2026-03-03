import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ManejoContactos from './ManejoContactos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  <ManejoContactos />
  </StrictMode>,

)