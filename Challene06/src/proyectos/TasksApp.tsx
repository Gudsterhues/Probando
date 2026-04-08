import { useContext, useState } from "react"
import { TasksContext } from "../context/TasksContext.jsx"

interface Task {
  id: string
  title: string
  done: boolean
}

function TasksApp() {
  const { tasks, addTask, updateTask, deleteTask, toggleDone } =
    useContext(TasksContext)

  const [titulo, setTitulo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!titulo.trim()) {
      alert("La tarea no puede estar vacía")
      return
    }

    if (editingId) {
      await updateTask(editingId, { title: titulo })
      setEditingId(null)
    } else {
      await addTask({
        title: titulo,
        done: false,
      })
    }

    setTitulo("")
  }

  const handleEdit = (task: Task) => {
    setTitulo(task.title)
    setEditingId(task.id)
  }

  const handleCancel = () => {
    setTitulo("")
    setEditingId(null)
  }

  return (
    <>
      <h2>Task App</h2>

      <input
        type="text"
        placeholder="Escribe una tarea"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingId ? "Actualizar" : "Añadir"}
      </button>

      {editingId && (
        <button onClick={handleCancel}>
          Cancelar
        </button>
      )}

      <h3>Lista de tareas</h3>

      {tasks.length === 0 ? (
        <p>No hay tareas todavía</p>
      ) : (
        tasks.map((task: Task) => (
          <div key={task.id}>
            <p>Título: {task.title}</p>
            <p>Estado: {task.done ? "Done" : "Pending"}</p>

            <button onClick={() => toggleDone(task)}>
              {task.done ? "Marcar pendiente" : "Marcar hecha"}
            </button>

            <button onClick={() => handleEdit(task)}>
              Editar
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Eliminar
            </button>

            <hr />
          </div>
        ))
      )}
    </>
  )
}

export default TasksApp