import React from 'react'
import { Link } from 'react-router-dom'

const MiniNavigation = () => {
    return (
        <nav id='mini-navigation'>
            <ul>
                <li><Link className='navlinks' to={null}>Home</Link></li>
                <li><Link className='navlinks' to={null}>Search</Link></li>
                <li><Link className='navlinks' to={null}>Message</Link></li>
                <li><Link className='navlinks' to={null}>Explore</Link></li>
                <li><Link className='navlinks' to={null}>Profile</Link></li>
            </ul>
        </nav>
    )
}

export default MiniNavigation