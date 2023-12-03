import React from 'react'
import { Link } from 'react-router-dom'

const MiniNavigation = () => {
    return (
        <nav id='mini-navigation'>
            <ul>
                <li><Link className='navlinks' to='/'>Home</Link></li>
                <li><Link className='navlinks' to='/search'>Search</Link></li>
                <li><Link className='navlinks' to='/message'>Message</Link></li>
                <li><Link className='navlinks' to='/explore'>Explore</Link></li>
                <li><Link className='navlinks' to='/profile'>Profile</Link></li>
            </ul>
        </nav>
    )
}

export default MiniNavigation