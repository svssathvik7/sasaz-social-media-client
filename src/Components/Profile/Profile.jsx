import React, { useState } from 'react'
import ProfileSideBar from './ProfileSideBar';
import './Profile.css';
import ProfileEdit from './ProfileEdit';
import ProfileFeed from './ProfileFeed';
const Profile = () => {
    const [current, setCurrent] = useState('2');
    const changeFunction = (e) => {
        console.log(e.target.id);
        setCurrent(e.target.id);
    }
    console.log(current);
    return (
        <div id='profile-main'>
            <ProfileSideBar changeFunction={changeFunction} />
            <div id='profile-dynamics'>
                {current === '1' ? <ProfileEdit /> : current === '2' ? <ProfileFeed /> : <ProfileFeed />}
            </div>
        </div>
    )
}

export default Profile;