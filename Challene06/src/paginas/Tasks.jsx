import { Link } from "react-router-dom"
import TasksApp from "../proyectos/TasksApp.jsx"

function Tasks() {
  return (
    <div className="page">
      <div className="card">
        <h1>Tasks</h1>
        <TasksApp />
        <Link to="/dashboard">Volver al dashboard</Link>
      </div>
    </div>
  )
}

export default Tasks