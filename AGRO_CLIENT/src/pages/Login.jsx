import LoginForm from "../features/auth/LoginForm"

const Login = () => {
    return (
        <div className="login-container">
            <h2 className="text-3xl font-poppins" >Iniciar Sesion</h2>
            <LoginForm/>
        </div>
    )
}

export default Login