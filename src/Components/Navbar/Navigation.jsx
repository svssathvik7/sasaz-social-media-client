import React, { useEffect, useState } from 'react'
import icon1 from "../../assets/Favicon.png";
import icon2 from "../../assets/Favicon.png";
import profile from '../../assets/image.png';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import './Navigation.css';
const Navigation = (props) => {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const windowSize = window.innerWidth;
        console.log(windowSize);
        if (windowSize < 992) {
            setMobile(true);
        }
    }, []);
    return (
        <nav id='maxi-navigation'>
            <div id='nav-main1'>
                <Logo src={icon1} id='logo' />
                {
                    !mobile &&
                    <ul>
                        <li><Link className='navlinks' to="/">Home</Link></li>
                        <li><Link className='navlinks' to="/">Search</Link></li>
                        <li><Link className='navlinks' to="/">Message Friends</Link></li>
                        <li><Link className='navlinks' to="/">Explore</Link></li>
                    </ul>
                }
            </div>
            <Logo func={props.handleOnlineFriends} src={profile} id='profile' />
        </nav>
    )
}

export default Navigation;