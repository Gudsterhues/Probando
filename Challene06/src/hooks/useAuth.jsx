import { useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { auth } from "../Firebase/config"

export function useAuth() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    setUser(response.user)
    return response.user
  }

  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    setUser(response.user)
    return response.user
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return { user, login, register, logout }
}