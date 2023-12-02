import React, { useState, useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import './Feed.css';
const Feed = (props) => {
    const ref = useRef(null);
    const [heart, setHeart] = useState(false);
    const [likes, setLikes] = useState(0);
    const isInView = useInView(ref, {
        once: false
    });
    return (
        <motion.div
            ref={ref}
            style={
                {
                    opacity: isInView ? 1 : 0.7,
                    transform: isInView ? 'translateY(0px)' : 'translateY(-30px)',
                    scale: isInView ? 1 : 0.8,
                }
            }
            id='feed-post'>
            <div id='post-meta'>
                <div id='post-meta-user-details'>
                    <img id='post-dp' alt='dp' src={props.data.dp} />
                    <h6 id='post-user'>{props.data.username}</h6>
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div id='post'>
                {props.data.type === "tweet" ? <h4>{props.data.post}</h4> : <img alt='post' src={props.data.post} />}
            </div>
            <div id='post-metrics'>
                <div id='metrics'>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon onClick={() => {
                            setLikes(likes + 1);
                        }} icon={faThumbsUp} />
                        <p>{likes}</p>
                    </div>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon icon={faShare} />
                    </div>
                </div>
                <div id='fav-post'>
                    <FontAwesomeIcon onClick={() => {
                        setHeart(!heart);
                    }} icon={faHeart} style={{ color: heart ? 'red' : 'black' }} />
                </div>
            </div>
        </motion.div>
    )
}

export default Feed;
