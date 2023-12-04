import React, { useEffect, useState } from 'react'
import icon1 from "../../assets/Favicon.png";
import profile from '../../assets/image.png';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
const Navigation = (props) => {
    const location = useLocation();
    const [mobile, setMobile] = useState(false);
    const [path, setPath] = useState('/auth');
    useEffect(() => {
        setPath(location.pathname);
        const windowSize = window.innerWidth;
        if (windowSize < 992) {
            setMobile(true);
        }
    }, [location.pathname]);
    return (
        <div>
            {path !== '/auth' &&
                <nav id='maxi-navigation'>
                    <div id='nav-main1'>
                        <Logo src={icon1} id='logo' />
                        {
                            !mobile &&
                            <ul>
                                <li><Link className='navlinks' to="/">Home</Link></li>
                                <li><Link className='navlinks' to="/search">Search</Link></li>
                                <li><Link className='navlinks' to="/message">Message Friends</Link></li>
                                <li><Link className='navlinks' to="/explore">Explore</Link></li>
                                <li><Link className='navlinks' to="/auth">Log In</Link></li>
                            </ul>
                        }
                    </div>
                    <Logo func={props.handleOnlineFriends} src={profile} id='profile' />
                </nav>}
        </div>
    )
}

export default Navigation;