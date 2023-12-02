import React from 'react'
import feedImage from '../../assets/feedDemo.webp';
import './Feed.css';
const Feed = () => {
    return (
        <div id='feed-post'>
            <img src={feedImage} alt="Post" />
        </div>
    )
}

export default Feed;
