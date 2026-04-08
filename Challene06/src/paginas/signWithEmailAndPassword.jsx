import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/Mycontext.jsx"



function EntradaFirebase() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleLogin = async e => {
    e.preventDefault()

    try {
      await login(email, password)
      setError("")
      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
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


          <Link to="/register">
            <button type="button">Ir a registrarme</button>
          </Link>

        {error && <p>{error}</p>}
      </div>
    </div>
  )
}

export default EntradaFirebase