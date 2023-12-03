import React from 'react'
import './Navigation.css';
import { useNavigate } from 'react-router-dom';
const Logo = (props) => {
    const currentPath = window.location.href;
    const navigate = useNavigate();
    return (
        <img src={props.src} alt="Logo Icon" id={props.id} onClick={currentPath === '/' ? props.func : () => {
            navigate("/profile");
        }} />
    );
}

export default Logo;