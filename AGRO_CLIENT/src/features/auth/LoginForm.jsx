import { useState } from "react"
import { useAuth } from "../../hooks/UseAuth"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault
        setError(null)

        try {
            await login(username, password)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit" > Iniciar Sesion </Button>
        </form>
    )
}

export default LoginForm