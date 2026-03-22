import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Mycontext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email !== "user@mail.com" || password !== "123") {
      setError("Credenciales inválidas");
      return;
    }

    const fakeUser = {
      email: "user@mail.com",
      password: "123",
      username: "user",
      name: "User Demo",
    };

    login(fakeUser);
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        <p>Usuario válido: user@mail.com</p>
        <p>Contraseña válida: 123</p>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Login;