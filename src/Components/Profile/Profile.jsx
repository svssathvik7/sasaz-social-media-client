import React, { useState } from 'react'
import ProfileSideBar from './ProfileSideBar';
import './Profile.css';
import ProfileEdit from './ProfileEdit';
import ProfileFeed from './ProfileFeed';
import ProfileFeedUpload from './ProfileFeedUpload';
import ProfileSavedPosts from './ProfileSavedPosts';
const Profile = () => {
    const [current, setCurrent] = useState('2');
    const changeFunction = (e) => {
        setCurrent(e.target.id);
    }
    return (
        <div id='profile-main'>
            <ProfileSideBar changeFunction={changeFunction} />
            <div id='profile-dynamics'>
                {current === '1' ? <ProfileEdit /> : current === '2' ? <ProfileFeed /> : current === '3' ? <ProfileFeedUpload /> :
                    current === '5' ? <ProfileSavedPosts /> : null}
            </div>
        </div>
    )
}

export default Profile;