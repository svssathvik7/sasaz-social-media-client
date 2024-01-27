import React, { useState, useRef, useContext } from 'react'
import { motion, useInView } from "framer-motion";
import { faBars, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import heartImage from "./heart.webp";
import replyImage from './5005361.webp';
import './Feed.css';
import axios from 'axios';
import { userContextProvider } from '../Contexts/UserContext';
const Feed = (props) => {
    const [post, setPost] = useState({
        _id: props.data._id,
        type: props.type || 'post',
        dp: props.dp,
        username: props.data.userName,
        imageUrl: props.data.imageUrl,
        comments: props.data.comments,
        likes: props.data.likes,
    });
    const [topBar, setTopBar] = useState(false);
    const ref = useRef(null);
    const commentRef = useRef(null);
    const { user: { name, email } } = useContext(userContextProvider);
    const [heart, setHeart] = useState(false);
    const [comment, setComment] = useState('');
    const [reply, setReply] = useState({
        actualReply: '',
        open: false,
        cId: ''
    });
    const isInView = useInView(ref, {
        once: false
    });
    const changeCommentInput = (e) => {
        const { value } = e.target;
        setComment(value);
    }
    const changeReplyInput = (e) => {
        const { value } = e.target;
        setReply((prevValue) => {
            return { ...prevValue, actualReply: value }
        });
    }
    const likePost = async (e) => {
        try {
            const response = await axios.post("http://localhost:5001/api/user/likes", { pId: post._id, email: email });
            const data = response.data;
            setPost((prevValue) => {
                return { ...prevValue, likes: data.likes }
            });
        }
        catch (err) {
            console.log(err);
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
    const openTopBar = () => {
        setTopBar((prevValue) => {
            return !prevValue
        });
    }
    const handlePostDelete = async (e) => {
        try {
            const response = (await axios.post("http://localhost:5001/api/user/deletePost/", {
                postId: props.data._id
            })).data;
            if (response.status) {
                console.log("Successfull deletion!")
            }
            else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const likeComment = async (e) => {
        const commentId = e.target.id;
        const response = await axios.post("http://localhost:5001/api/user/likes", { pId: post._id, email: email, cId: commentId, comment: true });
        const data = response.data;
        console.log(data.message);
        setPost((prevValue) => {
            const newComments = prevValue.comments.map((ele) => {
                if (ele._id === commentId) {
                    ele = data.likedComment;
                }
                return ele;
            });
            return { ...prevValue, comments: newComments };
        });
    }
    const postComment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/user/comment', { pId: post._id, comment, name, email });
            const data = response.data;
            console.log(data);
            setPost((prevValue) => {
                return { ...prevValue, comments: [...prevValue.comments, { comment: comment, userCommented: name, likes: 0, replies: [], usersLiked: [], _id: data.newComment._id }] }
            })
            setComment("");
            toggleComment();
        } catch (error) {
            console.log(error);
        }
    }
    const postReply = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/api/user/reply', { pId: post._id, reply: reply.actualReply, cId: reply.cId, email: email });
            const data = response.data;
            console.log(data.message);
            setReply((prev) => {
                return { ...prev, open: !prev.open, cId: '', reply: '' }
            });

        } catch (error) {
            console.log(error);
        }
    }
    const openReplyBar = (e) => {
        const commentId = e.target.id;
        setReply((prev) => {
            return { ...prev, open: !prev.open, cId: commentId }
        });
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
                    <img id='post-dp' alt='dp' src={props && props ? props.dp : "#"} />
                    <h4 id='post-user'>{props.name}</h4>
                </div>
                <div className='font-awesome-icon'>
                    <FontAwesomeIcon onClick={openTopBar} icon={faBars} />
                    {topBar && <div id="top-bar-section">
                        <p>Save</p>
                        <p onClick={handlePostDelete}>Delete</p>
                    </div>}
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
                    return <div className='post-comments'>
                        <div key={ind} className='comment-data-header'>
                            <div className='comment-data'>
                                <h4>{comment.userCommented} : </h4>
                                <p>{comment.comment}</p>
                            </div>
                            <div className='comment-response'>
                                <img id={comment._id} onClick={likeComment} style={{ width: '1em', height: '1em' }} src={heartImage} alt="heart" />
                                {comment.likes}
                                <img id={comment._id} onClick={openReplyBar} style={{ width: '1em', height: '1em' }} src={replyImage} alt="reply" />
                            </div>
                        </div>
                        {comment.replies.length !== 0 ? <div className='replies'>
                            <div className="line"></div>
                            <p>view replies</p>
                            <div className="line"></div>
                        </div> : null}
                    </div>
                })}
                {
                    reply.open && <form id='reply-form' onSubmit={postReply}>
                        <input type="text" placeholder='Reply To Comment' required onChange={changeReplyInput} />
                        <button type='submit'>Reply</button>
                    </form>
                }
                <form id='comment-form' onSubmit={postComment}>
                    <input type="text" placeholder='Enter Comment' value={comment} required onChange={changeCommentInput} />
                    <button type='submit'>Comment</button>
                </form>
            </div>



        </motion.div>
    )
}

export default Feed;
