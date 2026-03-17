import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Libros from './librosstack.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Libros />
  </StrictMode>,
)
