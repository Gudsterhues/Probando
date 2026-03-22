import { Link } from "react-router-dom";
import Libros from "../proyectos/librosstack.tsx";

function ProyectoLibros() {
  return (
    <div className="page">
      <div className="card">
        <h1>Challenge de Libros</h1>
        <Libros />
        <Link to="/dashboard">Volver al dashboard</Link>
      </div>
    </div>
  );
}

export default ProyectoLibros;