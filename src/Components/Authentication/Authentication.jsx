import React, { useEffect, useState } from 'react'
import SideImage from '../../assets/AuthSideImage.jpg';
import './Authentication.css';
import AuthenticationUtilityForm from './AuthenticationUtilityForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Authentication = () => {
    const navigate = useNavigate();
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
        let backendData = {
            email: auth.email,
            password: auth.password
        }
        if (name === 'Login') {
            const response = await axios.post('http://localhost:5001/api/authenticate/userLogin', { backendData });
            const data = await response.data;
            if (data.user) {
                localStorage.setItem('token', data.user);
                navigate("/");
            }
            else if (data.status) {
                changePath();
            }
            console.log(data.message);
        }
        else {
            backendData = {
                ...backendData,
                name: auth.name,
                phNumber: auth.phNumber
            }
            const response = await axios.post('http://localhost:5001/api/authenticate/newRegistration', { backendData });
            const data = await response.data;
            if (data.status) {
                changePath();
            }
            console.log(data.message);
        }
    }
    useEffect(() => {
        const windowSize = window.innerWidth;
        if (windowSize < 992) {
            setMobile(true);
        }
    }, [path]);
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