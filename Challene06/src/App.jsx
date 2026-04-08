import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import EntradaFirebase from "./paginas/signWithEmailAndPassword.jsx";
import Dashboard from "./paginas/Dashboard.jsx";
import NotFound from "./paginas/Notfound.jsx";
import Register from "./paginas/Register.jsx";
import Tasks from "./paginas/Tasks.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/EntradaFirebase" replace />} />
      <Route path="/EntradaFirebase" element={<EntradaFirebase />} />

      <Route path="/Register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />

      

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;