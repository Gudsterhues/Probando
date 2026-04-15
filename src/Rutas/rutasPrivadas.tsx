import { useContext, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/Mycontest'

type Props = {
  children: ReactNode
}

function RutasPrivadas({ children }: Props) {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext debe usarse dentro de AuthProvider')
  }

  const { user } = authContext

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default RutasPrivadas