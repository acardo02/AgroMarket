import './UserForms.style.css';
import { memo, useState } from "react";
import BgForms from '../../assets/images/bg-forms.jpg';
import { Outlet } from 'react-router-dom';
import Logo from '../../assets/logos/logoAgro.svg'

const UserForms = () => {
    return (
        <div className='userForms'>
            <div className='Forms'>
                <div className='logo'>
                    <div className='circle'>
                        <img src={Logo} className='Logo-img' alt="logo" />
                    </div>
                </div>
                <Outlet />
            </div>
            <figure className='bg-side-forms'>
                <img src={BgForms} alt="imagen" />
            </figure>
        </div>
    )   
};

export default memo(UserForms);