import './login.style.css';
import React from 'react';
import Button from '../Button/button';
import { CheckLogin } from '../../helpers/validate';

//✅
const login = ({hookNavigate}) => {
    const navigate = hookNavigate();
    return (
        <form id='login-form' className='container-login-form' method='POST' onSubmit={async (e) => {
            e.preventDefault();
            const band =  await CheckLogin(e);
            if (band) {
                navigate('/home');
            }
        }}>
            <label className='info-login'>
                <input name="user" type="text" id="user-name"  placeholder='Usuario' required />
            </label>

            <label className='info-login'>
                <input name="password" type="password" id="user-password" placeholder='Contraseña'  required />
            </label>

            <Button id="login-button" type="submit">
                Ingresar
            </Button>

            <br></br>

            <Button id="register-button" type="button" onClick={() => {navigate("/register")}}>
                Registrarse
            </Button>
        </form>
    )
};

export default login;