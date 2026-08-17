import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function AdminLogin() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, password})
    })
    const data = await response.json()
    if (!response.ok) {
      setError("Wrong username or password")
      return
    }
    localStorage.setItem("token", data.token)
    if (data.role === "admin") {
      navigate("/admin")
    } else {
      navigate("/products")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      <Link to="/register">No account? Register here!</Link>
    </form>
  )
}