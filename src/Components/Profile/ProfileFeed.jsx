import React, { useContext, useEffect } from 'react'
import Feed from '../Feed/Feed'
import { Link } from 'react-router-dom'
import { userContextProvider } from '../Contexts/UserContext'
import { userPostsContext } from '../Contexts/UserPostContext'
const ProfileFeed = () => {
    const { user } = useContext(userContextProvider);
    const {posts} = useContext(userPostsContext);
    return (
        <div id='profile-feed-main'>
            {posts.map((post, ind) => (
                <div key={ind}>
                    <Feed data={post} dp={user ? user.dp : "#"} username={user ? user.name : "User"}/>
                </div>
            ))}
            <nav id='profile-navigation'>
                <ul>
                    <li><Link className='navlinks' to='/profile'>Posts</Link></li>
                    <li><Link className='navlinks' to='/profile'>Liked Posts</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default ProfileFeed