import React from 'react'
import './Feed.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
const Feed = (props) => {
    return (
        <div id='feed-post'>
            <div id='post-meta'>
                <div id='post-meta-user-details'>
                 <img id='post-dp' alt='dp' src={props.data.dp}/>
                 <h6 id='post-user'>{props.data.username}</h6>
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faBars}/>
                </div>
            </div>
            <div id='post'>
                {props.data.type==="tweet" ? <h4>{props.data.post}</h4> : <img alt='post' src={props.data.post}/>}
            </div>
            <div id='post-metrics'>
                <div id='metrics'>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </div>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon icon={faShare} />
                    </div>
                </div>
                <div id='fav-post'>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
        </div>
    )
}

export default Feed;
