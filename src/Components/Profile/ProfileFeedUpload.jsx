import React, { useContext, useState } from 'react';
import axios from 'axios';
import { userContextProvider } from '../Contexts/UserContext';

const ProfileFeedUpload = (props) => {
    const { user } = useContext(userContextProvider);
    const [post, setPost] = useState({
        imageurl: '',
        caption: ''
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
        console.log(data.message);
    }
    return (
        <form onSubmit={uploadPost}>
            <label htmlFor="file-input"></label>
            <input onChange={changePost} name='imageurl' type="file" required />
            <input onChange={changePost} type="text" placeholder='Enter Caption' required name='caption' />
            <button type='submit'>Post</button>
        </form>
    )
}

export default ProfileFeedUpload;