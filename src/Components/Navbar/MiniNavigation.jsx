import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TokenValidity from '../Authentication/TokenValidityUtility';

const MiniNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState('/auth');
    useEffect(() => {
        TokenValidity().then((res) => {
            if (!res) {
                navigate('/auth');
            }
        })
        setPath(location.pathname);
    }, [location.pathname])
    return (
        <div>
            {path !== '/auth' && <nav id='mini-navigation'>
                <ul>
                    <li><Link className='navlinks' to='/'>Home</Link></li>
                    <li><Link className='navlinks' to='/search'>Search</Link></li>
                    <li><Link className='navlinks' to='/explore'>Explore</Link></li>
                    <li><Link className='navlinks' to='/profile'>Profile</Link></li>
                    <li><Link onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/auth');
                    }} className='navlinks' to='/auth'>Log Out</Link></li>
                </ul>
            </nav>}
        </div>
    )
}

export default MiniNavigation