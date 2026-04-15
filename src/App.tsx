import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginCorreo from './Paginas/loginCorreo'
import Menu from './Paginas/Menu'
import RutasPrivadas from './Rutas/rutasPrivadas'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginCorreo />} />

      <Route
        path="/menu"
        element={
          <RutasPrivadas>
            <Menu />
          </RutasPrivadas>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App