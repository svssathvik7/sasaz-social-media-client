import React from 'react'
import icon1 from "../../assets/Favicon.png";
import icon2 from "../../assets/Logo.png";
import Logo from './Logo';
import './Navigation.css';
const Navigation = () => {
    return (
        <nav>
            <div id='nav-main1'>
                <Logo src={icon1}/>
                <ul>
                    <li>NavLink</li>
                    <li>NavLink</li>
                    <li>NavLink</li>
                    <li>NavLink</li>
                    <li>NavLink</li>
                </ul>
            </div>
            <Logo src={icon2} />
        </nav>
    )
}

export default Navigation;
