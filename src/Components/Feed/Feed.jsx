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
    const commentRef = useRef(null);
    const { user: { name, email } } = useContext(userContextProvider);
    const [heart, setHeart] = useState(false);
    const [comment, setComment] = useState('');
    const [likes, setLikes] = useState({
        alter: false,
        like: props.data.likes
    });
    const isInView = useInView(ref, {
        once: false
    });
    const changeCommentInput = (e) => {
        const { value } = e.target;
        setComment(value);
    }
    const likePost = async (e) => {
        try {
            const alter = !likes.alter;
            if (likes.alter === true) {
                setLikes((prevValue) => {
                    return { alter: false, like: prevValue.like + 1 }
                })
            }
            else {
                setLikes((prevValue) => {
                    return { alter: true, like: prevValue.like - 1 }
                });
            }
            const response = await axios.post("http://localhost:5001/api/user/likes", { alter: alter, pId: props.data._id });
            const data = response.data;
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
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
        const element = commentRef.current;
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
                        <FontAwesomeIcon onClick={likePost} icon={faThumbsUp} />
                        <p>{likes.like}</p>
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
            <div id='comment-block' ref={commentRef}>
                {props.data.comments && props.data.comments.map((comment, ind) => {
                    return <div key={ind} className='comment-data'>
                        <h4>{comment.userCommented} : </h4>
                        <p>{comment.comment}</p>
                    </div>
                })}
                <form onSubmit={postComment}>
                    <input type="text" placeholder='Enter Comment' onChange={changeCommentInput} />
                    <button type='submit'>Comment</button>
                </form>
            </div>
        </motion.div>
    )
}

export default Feed;
