import { Link } from "react-router-dom";
import Cajeros from "../proyectos/CajeroQueu.tsx";

function ProyectoUno() {
  return (
    <div className="page">
      <div className="card">
        <h1>Challenge Cajero</h1>
        <Cajeros />
        <Link to="/dashboard">Volver al dashboard</Link>
      </div>
    </div>
  );
}

export default ProyectoUno;