import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const MiniNavigation = () => {
    const location = useLocation();
    const [path, setPath] = useState('/auth');
    useEffect(() => {
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
                    <li><Link className='navlinks' to='/auth'>Log In</Link></li>
                </ul>
            </nav>}
        </div>
    )
}

export default MiniNavigation