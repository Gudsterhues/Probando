import { createContext, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { useAuth } from '../Hooks/useAuth'

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, login, logout } = useAuth()

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}