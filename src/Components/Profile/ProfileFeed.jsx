import React, { useContext } from 'react'
import Feed from '../Feed/Feed'
import postConstants from '../../Constants/PostConstants'
import { Link } from 'react-router-dom'
import { userContextProvider } from '../Contexts/UserContext'

const ProfileFeed = () => {
    const { user } = useContext(userContextProvider);
    return (
        <div id='profile-feed-main'>
            {user && user.posts && user.posts.map((post, ind) => (
                <div key={ind}>
                    <Feed data={post} dp={user.dp} />
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