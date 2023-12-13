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
    const uploadPost = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5001/api/user/userPost', { ...post, email: user.email });
        const data = response.data;
        setMessage(data.message);
    }
    return (
        <div id='profile-feed-post'>
            <form onSubmit={uploadPost}>
                <input onChange={changePost} name='imageurl' type="file" required />
                <input onChange={changePost} type="text" placeholder='Enter Caption' required name='caption' />
                <select onChange={changePost} name="category" id="category">
                    <option name='category' value="select">Choose Category</option>
                    <option name='category' value="Study">Study</option>
                    <option name='category' value="Fashion">Fashion</option>
                    <option name='category' value="Gaming">Gaming</option>
                    <option name='category' value="Space">Space</option>
                </select>
                <button type='submit'>Post</button>
            </form>
            <p>{message}</p>
        </div>
    )
}

export default ProfileFeedUpload;