import React from 'react'
import './Feed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
const Feed = (props) => {
    return (
        <div id='feed-post'>
            <div id='post-meta'>
                 <img id='post-dp' alt='dp' src={props.data.dp}/>
                 <h6 id='post-user'>{props.data.username}</h6>
            </div>
            <div id='post'>
                {props.data.type==="tweet" ? <h4>{props.data.post}</h4> : <img alt='post' src={props.data.post}/>}
            </div>
            <div id='post-metrics'>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faComment} />
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faShare} />
                </div>
            </div>
        </div>
    )
}

export default Feed;
