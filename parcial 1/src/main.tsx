import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ListadoPacientes from './Pacientes.tsx';
import Comite from './Comite.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ListadoPacientes />
    <Comite />
  </StrictMode>,
)
