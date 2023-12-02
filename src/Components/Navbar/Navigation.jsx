import React from 'react'
import icon1 from "../../assets/favicon.png";
import icon2 from "../../assets/favicon.png";
import Logo from './Logo';
import './Navigation.css';
const Navigation = () => {
    return (
        <nav>
            <div id='nav-main1'>
                <Logo src={icon1} />
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">NavLinks</a></li>
                    <li><a href="#">NavLinks</a></li>
                    <li><a href="#">NavLinks</a></li>
                    <li><a href="#">NavLinks</a></li>
                </ul>
            </div>
            <Logo src={icon2} />
        </nav>
    )
}

export default Navigation;
