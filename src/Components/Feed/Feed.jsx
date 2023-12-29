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
import ProfileSideBar from '../Profile/ProfileSideBar';
const Feed = (props) => {
    const [post, setPost] = useState({
        _id: props.data._id,
        type: props.type || 'post',
        dp: props.dp,
        username: props.data.userName,
        imageUrl: props.data.imageUrl,
        comments: props.data.comments,
        likes: props.data.likes,
        alter: true
    });
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
            const alter = post.alter;
            const resultAlter = !(post.alter);
            const resultLikes = post.alter === false ? post.likes - 1 : post.likes + 1;
            setPost((prevValue) => {
                return { ...prevValue, alter: resultAlter, likes: resultLikes }
            })
            const response = await axios.post("http://localhost:5001/api/user/likes", { alter: alter, pId: post._id });
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
            const response = await axios.post('http://localhost:5001/api/user/comment', { pId: post._id, comment, name, email });
            const data = response.data;
            setPost((prevValue) => {
                return { ...prevValue, comments: [...prevValue.comments, { comment: comment, userCommented: name }] }
            })
            setComment("");
            toggleComment();
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
                    <img id='post-dp' alt='dp' src={post.dp} />
                    <h6 id='post-user'>{post.username}</h6>
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div id='post'>
                {post.type === "tweet" ? <h4>{post.imageUrl}</h4> : <img alt='post' src={post.imageUrl} />}
            </div>
            <div id='post-metrics'>
                <div id='metrics'>
                    <div className='font-awesome-metric-icon'>
                        <FontAwesomeIcon onClick={likePost} icon={faThumbsUp} />
                        <p>{post.likes}</p>
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
                {post.comments && post.comments.map((comment, ind) => {
                    return <div key={ind} className='comment-data'>
                        <h4>{comment.userCommented} : </h4>
                        <p>{comment.comment}</p>
                    </div>
                })}
                <form onSubmit={postComment}>
                    <input type="text" placeholder='Enter Comment' value={comment} onChange={changeCommentInput} />
                    <button type='submit'>Comment</button>
                </form>
            </div>
        </motion.div>
    )
}

export default Feed;
