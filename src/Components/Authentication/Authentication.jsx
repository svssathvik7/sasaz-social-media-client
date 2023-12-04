import React, { useEffect, useState } from 'react'
import SideImage from '../../assets/AuthSideImage.jpg';
import './Authentication.css';
import AuthenticationUtilityForm from './AuthenticationUtilityForm';
const Authentication = () => {
    const [path, setPath] = useState({
        heading: 'Sign In',
        changeMessage: 'Registered? ',
        type: 'Login',
    });
    const [mobile, setMobile] = useState(false);
    const changePath = () => {
        if (path.type === 'Login') {
            setPath({
                heading: "Sign Up",
                changeMessage: "Logged? ",
                type: "Register"
            })
        }
        else {
            setPath({
                heading: 'Sign In',
                changeMessage: 'Registered? ',
                type: 'Login',
            })
        }
    }
    useEffect(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 992) {
            setMobile(true);
        }
    }, []);
    return (
        <div id='authentication-main'>
            <div id='authentication-dynamics'>
                <AuthenticationUtilityForm heading={path.heading} changeMessage={path.changeMessage} type={path.type} changePath={changePath} />
            </div>
            {!mobile && <img src={SideImage} alt="Auth" />}
        </div >
    )
}

export default Authentication