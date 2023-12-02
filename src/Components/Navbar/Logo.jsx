import React from 'react'
import './Navigation.css';
const Logo = (props) => {
    return (
        <img src={props.src} alt="Logo Icon" id={props.id} onClick={props.func}/>
    );
}

export default Logo;