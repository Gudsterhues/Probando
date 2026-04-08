import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <div className="card">
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link to="/EntradaFirebase">Ir al login</Link>
      </div>
    </div>
  );
}

export default NotFound;