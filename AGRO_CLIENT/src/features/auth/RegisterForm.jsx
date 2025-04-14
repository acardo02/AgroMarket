import { useState } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { registerService } from "../../services/AuthService"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== cPassword) {
            setErrors({cPassword: 'Las contraseñas no coinciden'})
            return
        }

        try {
            const response = await registerService(username, email, address, phoneNumber, password)
            if (response.success) {
                navigate('/')
            } else {
                setErrors({ email: 'Error al registrarse. Intenta con otro correo.' })
            }
        } catch(err) {
            console.error('Error al registarse:', err)
            setErrors({ email: 'Hubo un error al registrarse' })
        }
    }

    return(
        <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
            <Input
                type="text"
                placeHolder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <Input
                type="email"
                placeHolder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={errors.email}
            />
            <Input
                type="text"
                placeHolder="Dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <Input
                type="text"
                placeHolder="Teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            <Input
                type="password"
                placeHolder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                type="password"
                placeHolder="Confirmar contraseña"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
                error={errors.cPassword}
            />
            <Button type="submit" className="w-5/6">Registrate</Button>
            <p className="text-white font-poppins font-bold ">¿Ya tienes una cuenta? <span className="text-black font-bold hover:text-gray-900 "><a href="/register">Inicia Sesión</a></span></p>
        </form>   
    )
}

export default RegisterForm