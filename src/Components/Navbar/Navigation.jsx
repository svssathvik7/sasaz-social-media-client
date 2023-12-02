import React from 'react'
import icon1 from "../../assets/Favicon.png";
import icon2 from "../../assets/Favicon.png";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = () => {
    return (
        <nav>
            <div id='nav-main1'>
                <Logo src={icon1} id='logo'/>
                <ul>
                    <li><Link className='navlinks' to="/">Home</Link></li>
                    <li><Link className='navlinks' to="/">NavLinks</Link></li>
                    <li><Link className='navlinks' to="/">NavLinks</Link></li>
                    <li><Link className='navlinks' to="/">NavLinks</Link></li>
                    <li><Link className='navlinks' to="/">NavLinks</Link></li>
                </ul>
            </div>
            <Logo src={icon2} id='profile'/>
        </nav>
    )
}

export default Navigation;
