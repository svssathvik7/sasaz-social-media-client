import React, { useContext, useEffect, useState } from 'react'
import icon1 from "../../assets/Favicon.png";
import profile from '../../assets/image.png';
import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';
import TokenValidity from '../Authentication/TokenValidityUtility';
import { userContextProvider } from '../Contexts/UserContext';
const Navigation = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobile, setMobile] = useState(false);
    const [path, setPath] = useState('/auth');
    const { user, getUserDetails } = useContext(userContextProvider);
    useEffect(() => {
        TokenValidity().then((res) => {
            if (!res) {
                navigate('/auth');
            }
            else {
                getUserDetails();
            }
        });
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
                                <li><Link onClick={() => {
                                    localStorage.removeItem('token');
                                    navigate('/auth');
                                }} className='navlinks' to="/auth">Log Out</Link></li>
                            </ul>
                        }
                    </div>
                    <Logo func={props.handleOnlineFriends} src={user && user.dp ? user.dp : profile} id='profile' />
                </nav>}
        </div>
    )
}

export default Navigation;