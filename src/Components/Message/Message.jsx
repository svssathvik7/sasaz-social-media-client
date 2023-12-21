import React, { useContext } from 'react';
import { BsEmojiSmile } from "react-icons/bs";
import OnlineFriends from '../OnlineFriends/OnlineFriends';
import './Message.css';
import { userContextProvider } from '../Contexts/UserContext';

const Message = () => {
    const { user } = useContext(userContextProvider);
    return (
        <div id='message-page'>
            <OnlineFriends />
            <div id='messaging-block'>
                <div id='profile-box'>
                    {user && <img src={user.dp} alt="" />}
                    <p>Sathvik Shaik</p>
                </div>
                <div id='messaging-box'>
                    Here all the messages will appear
                </div>
                <div id="input-message-box">
                    <BsEmojiSmile />
                    <input type="text" placeholder='Enter Your Message' />
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Message