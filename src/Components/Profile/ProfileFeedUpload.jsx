import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContextProvider } from '../Contexts/UserContext';

const ProfileFeedUpload = (props) => {
    const [message, setMessage] = useState('');
    const { user } = useContext(userContextProvider);
    const [post, setPost] = useState({
        imageurl: '',
        caption: '',
        category: '',
    });
    const changePost = (e) => {
        const { name, value } = e.target;
        setPost((prev) => {
            return { ...prev, [name]: value }
        });
    }
    const postImage = async (e) => {
        const postImage = e.target.files[0];
        const data = new FormData();
        data.append("file", postImage);
        data.append("upload_preset", "socialApp");
        data.append("cloud_name", "dulewl8s5");
        fetch("https://api.cloudinary.com/v1_1/dulewl8s5/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setPost((prevValue) => {
                    return { ...prevValue, imageurl: data.url.toString() };
                })
            }).catch((err) => {
                console.log("Error Occured", err);
            });
    };
    const uploadPost = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5001/api/user/userPost', { ...post, email: user.email });
        const data = response.data;
        setMessage(data.message);
    }
    return (
        <div id='profile-feed-post'>
            <form onSubmit={uploadPost}>
                <input onChange={postImage} name='imageurl' type="file" required />
                <input onChange={changePost} type="text" placeholder='Enter Caption' required name='caption' />
                <select onChange={changePost} name="category" id="category">
                    <option name='category' value="select">Choose Category</option>
                    <option name='category' value="Study">Study</option>
                    <option name='category' value="Fashion">Fashion</option>
                    <option name='category' value="Gaming">Gaming</option>
                    <option name='category' value="Space">Space</option>
                    <option name='category' value="Other">Other</option>
                </select>
                <button type='submit'>Post</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default ProfileFeedUpload;