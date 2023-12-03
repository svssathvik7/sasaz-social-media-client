import React from 'react'
import Feed from '../Feed/Feed'
import postConstants from '../../Constants/PostConstants'
import { Link } from 'react-router-dom'

const ProfileFeed = () => {
    return (
        <div id='profile-feed-main'>
            {postConstants.map(post => (
                <div key={post.id}>
                    <Feed data={post} />
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