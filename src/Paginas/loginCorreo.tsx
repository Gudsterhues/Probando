import { useContext, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/Mycontest'

function LoginCorreo() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext debe usarse dentro de AuthProvider')
  }

  const { login } = authContext

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login(email, password)
      setError('')
      navigate('/menu')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Ocurrió un error al iniciar sesión')
      }
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Login con Firebase</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default LoginCorreo