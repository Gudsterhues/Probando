import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Login from "./paginas/Login.jsx";
import Dashboard from "./paginas/Dashboard.jsx";
import ProyectoUno from "./paginas/Cajero.jsx";
import ProyectoDos from "./paginas/libros.jsx";
import NotFound from "./paginas/Notfound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/cajero"
        element={
          <PrivateRoute>
            <ProyectoUno />
          </PrivateRoute>
        }
      />

      <Route
        path="/libros"
        element={
          <PrivateRoute>
            <ProyectoDos />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;