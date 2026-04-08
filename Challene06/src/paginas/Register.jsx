import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/Mycontext.jsx"

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const handleRegister = async e => {
    e.preventDefault()

    try {
      await register(email, password)
      setError("")
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h2>Registro</h2>

        <form onSubmit={handleRegister}>
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

          <button type="submit">Registrar</button>
        </form>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default Register