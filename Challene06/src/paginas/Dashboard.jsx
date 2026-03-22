import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Mycontext.jsx";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Dashboard</h1>
        <p>Usuario actual</p>
        <p>Correo: {user?.email}</p>
        <p>contraseña: {user?.password}</p>

        <div>
          <Link to="/cajero">Ir al challenge de Cajero</Link>
          <br />
          <Link to="/libros">Ir al challenge de Libros</Link>
        </div>

        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;