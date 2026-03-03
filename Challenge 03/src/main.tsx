import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Reproductor from "./Reproductor";
import Web from './Pagina.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Reproductor />
    <Web/>
  </StrictMode>,
)
