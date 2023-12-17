import React, { useState, useRef, useContext } from 'react'
import { motion, useInView } from "framer-motion";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import './Feed.css';
import axios from 'axios';
import { userContextProvider } from '../Contexts/UserContext';
const Feed = (props) => {
    const ref = useRef(null);
    const { user: { name, email } } = useContext(userContextProvider);
    const [heart, setHeart] = useState(false);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState(0);
    const isInView = useInView(ref, {
        once: false
    });
    const changeCommentInput = (e) => {
        const { value } = e.target;
        setComment(value);
    }
    const postComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/user/comment', { pId: props.data._id, comment, name, email });
            const data = response.data;
            console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const toggleComment = () => {
        const element = document.querySelector("#comment-block");
        if (element.classList.contains('comment-block-active')) {
            element.classList.remove("comment-block-active");
        }
        else {
            element.classList.add("comment-block-active");
        }
    }
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
                    <img id='post-dp' alt='dp' src={props.dp} />
                    <h6 id='post-user'>{props.username}</h6>
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div id='post'>
                {props.data.type === "tweet" ? <h4>{props.data.imageUrl}</h4> : <img alt='post' src={props.data.imageUrl} />}
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
                        <FontAwesomeIcon onClick={toggleComment} icon={faComment} />
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
            <form onSubmit={postComment} id="comment-block">
                <input type="text" placeholder='Enter Comment' onChange={changeCommentInput} />
                <button type='submit'>Comment</button>
            </form>
        </motion.div>
    )
}

export default Feed;
