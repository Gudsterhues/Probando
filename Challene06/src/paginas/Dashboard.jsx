import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Mycontext.jsx";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/EntradaFirebase");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Dashboard</h1>
        <p>Usuario actual</p>
        <p>Correo: {user?.email}</p>
        <p>contraseña: {user?.password}</p>

        <div>
          <Link to="/tasks">Ir a la asignacion de tareas</Link>
        </div>

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;