import { createContext, useEffect, useState } from "react"
import useCollection from "../hooks/useCollection"

export const TasksContext = createContext()

export function TasksProvider({ children }) {
  const { results, isPending, getAll, add, update, remove } = useCollection("tasks")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    const docs = await getAll()
    setTasks(docs)
  }

  const addTask = async task => {
    const newTask = await add(task)
    if (newTask) {
      setTasks(prev => [...prev, newTask])
    }
  }

  const updateTask = async (id, newData) => {
    const ok = await update(id, newData)
    if (ok) {
      setTasks(prev =>
        prev.map(task => (task.id === id ? { ...task, ...newData } : task))
      )
    }
  }

  const deleteTask = async id => {
    const ok = await remove(id)
    if (ok) {
      setTasks(prev => prev.filter(task => task.id !== id))
    }
  }

    const toggleDone = async (task) => {
      const ok = await update(task.id, { done: !task.done })

      if (ok) {
        setTasks(prev =>
          prev.map(item =>
            item.id === task.id
              ? { ...item, done: !item.done }
              : item
          )
        )
      }
    }

  return (
    <TasksContext.Provider
      value={{ tasks, isPending, addTask, updateTask, deleteTask, toggleDone }}
    >
      {children}
    </TasksContext.Provider>
  )
}