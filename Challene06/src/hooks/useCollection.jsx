import { useState } from "react"
import { db } from "../Firebase/config"
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore"

const useCollection = table => {
  const [results, setResults] = useState([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  const getAll = async (filters = []) => {
    setIsPending(true)
    setError(null)

    try {
      let q = query(collection(db, table))

      for (const [field, op, value] of filters) {
        q = query(q, where(field, op, value))
      }

      const snapshot = await getDocs(q)

      const docs = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      }))

      setResults(docs)
      setIsPending(false)
      return docs
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      return []
    }
  }

  const add = async data => {
    setIsPending(true)
    setError(null)

    try {
      const docRef = await addDoc(collection(db, table), {
        ...data,
        createdAt: serverTimestamp(),
      })

      const newDoc = {
        id: docRef.id,
        ...data,
      }

      setResults(prev => [...prev, newDoc])
      setIsPending(false)
      return newDoc
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      return null
    }
  }

  const update = async (id, data) => {
    setIsPending(true)
    setError(null)

    try {
      const docRef = doc(db, table, id)

      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })

      setResults(prev =>
        prev.map(item =>
          item.id === id ? { ...item, ...data } : item
        )
      )

      setIsPending(false)
      return true
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  const remove = async id => {
    setIsPending(true)
    setError(null)

    try {
      const docRef = doc(db, table, id)
      await deleteDoc(docRef)

      setResults(prev => prev.filter(item => item.id !== id))
      setIsPending(false)
      return true
    } catch (err) {
      setError(err.message)
      setIsPending(false)
      return false
    }
  }

  return { results, isPending, error, getAll, add, update, remove }
}

export default useCollection