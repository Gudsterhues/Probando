import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '../Firebase/config'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    const response = await signInWithEmailAndPassword(auth, email, password)
    setUser(response.user)
    return response.user
  }

  const logout = async (): Promise<void> => {
    await signOut(auth)
    setUser(null)
  }

  return { user, login, logout }
}