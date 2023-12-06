import React, { useEffect, useState } from 'react'
import SideImage from '../../assets/AuthSideImage.jpg';
import './Authentication.css';
import AuthenticationUtilityForm from './AuthenticationUtilityForm';
import axios from 'axios';
const Authentication = () => {
    const [path, setPath] = useState({
        heading: 'Sign In',
        changeMessage: 'Registered? ',
        type: 'Login',
    });
    const [auth, setAuth] = useState({
        email: '',
        name: '',
        password: '',
        phNumber: ''
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
    const changeInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setAuth((prevValue) => {
            return { ...prevValue, [name]: value }
        })
    }
    const Authenticate = async (e) => {
        e.preventDefault();
        const { name } = e.target;
        if (name === 'Login') {
            const backendData = {
                email: auth.email,
                password: auth.password
            }
            const response = await axios.post('#', { backendData });
            const data = await response.data;
            console.log(data);
        }
        else {
            const response = await axios.post('#', { auth });
            const data = await response.data;
            console.log(data);
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
                <AuthenticationUtilityForm changeInput={changeInput} Authenticate={Authenticate} heading={path.heading} changeMessage={path.changeMessage} type={path.type} changePath={changePath} />
            </div>
            {!mobile && <img src={SideImage} alt="Auth" />}
        </div >
    )
}

export default Authentication