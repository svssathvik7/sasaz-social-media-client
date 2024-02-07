import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useState, useEffect } from 'react'
import { userContextProvider } from '../Contexts/UserContext';
import { emoji } from './Emoji';
import { useInView } from 'framer-motion';
import "./Message.css";
import EmojiPicker from 'emoji-picker-react';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Emoji(props) {
    const { messageId, toggleEmoji, reactEmojiToMessage } = props;
    const emojiRef = useRef(null);
    const isInView = useInView(emojiRef, {
        once: true
    });
    const sendEmoji = (e) => {
        const emoji = e.target.innerHTML;
        if (emoji !== '+') {
            reactEmojiToMessage(emoji, messageId);
            toggleEmoji();
        }
    }
    return <div
        style={{
            opacity: isInView ? '1' : '0.3',
            transform: isInView ? 'translateY(0px)' : 'translateY(-15px)',
            scale: isInView ? '1' : '0.7'
        }}
        key={messageId}
        ref={emojiRef}
        id='emoji-block'
    >
        {emoji && emoji.map((ele) => {
            return <div onClick={sendEmoji} className='emoji'>{ele}</div>
        })}
        <div className='emoji'>+</div>
    </div>
}
export default function Message() {
    const [openEmoji, setOpenEmoji] = useState({
        open: false,
        messageId: null
    });
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(userContextProvider);
    const [client, setClient] = useState(user);
    const [emoji, setEmoji] = useState(false);
    const fetchMessages = async () => {
        try {
            const names = [user.email, client.email].sort();
            const response = (await axios.post("http://localhost:5001/api/chat/messages/", {
                chatId: names[0] + names[1]
            })).data;
            if (response.status) {
                setMessages(response.data.chat);
            }
            else {
                console.log('Error fetching messages:');
            }
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    }
    const handleEmojiInput = (emojiObj) =>{
        try{
            const newMessage = message + emojiObj.emoji;
            setMessage(newMessage);
        }catch(err){
            console.log(err);
        }
    }

    const sendMessage = async () => {
        try {
            const names = [user.email, client.email].sort();
            const result = await axios.post("http://localhost:5001/api/chat/addMessage/", {
                user: user._id,
                message: message,
                chatId: names[0] + names[1]
            });
            setMessage('');
            fetchMessages();
            setEmoji(false);
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    }

    const toggleEmoji = () => {
        setOpenEmoji((prev) => {
            return { ...prev, open: !prev.open, messageId: null }
        });
    }

    const reactEmojiToMessage = async (emoji, mId) => {
        const names = [user.email, client.email].sort();
        const chatId = names[0] + names[1];
        const response = await axios.post('http://localhost:5001/api/chat/reactMessage/', { emoji, chatId, mId });
        const newMessages = messages && messages.length && messages?.map((message, i) => {
            if (i === mId) {
                message.reply = emoji;
            }
            return message;
        });
        setMessages(newMessages);
        const data = response.data;
        console.log(data);
    }
    useEffect(
        () => {
            fetchMessages();
        }
        , [user, messages, message]);
    return (
        <div id='chat-container'>
            <div id="major-chat-container">
                <div id='friends-container'>
                    <h2>My Friends</h2>
                    {user && user.friends && user.friends.map((frnd, i) => (
                        <div key={i} onClick={() => { setClient(frnd) }} className='frnd-data'>
                            <img alt='dp' src={frnd?.dp} className='dp' />
                            <p>{frnd?.name}</p>
                            <div className='active-dot'></div>
                            {/* <div className='offline-dot'></div> */}
                        </div>
                    ))}
                </div>
                <div className='chat-holder'>
                    <div className='client-details'>
                        <img src={client?.dp} alt='dp' className='client-dp'/>
                        <p className='client-name'>{client?.name}</p>
                    </div>
                    {messages && messages.length && messages?.map((message, i) => (
                        message.user._id === user._id ?
                            <div key={i} className='chat-box-native-head'>
                                {openEmoji.open && openEmoji.messageId === i && <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={i} toggleEmoji={toggleEmoji} />}
                                <FontAwesomeIcon onClick={() => {
                                    setOpenEmoji((prev) => {
                                        return { ...prev, open: !prev.open, messageId: i }
                                    });
                                }} className='emoji-icon' icon={faFaceSmile} />
                                <div className='chat-box-native' >
                                    <p>{message.message}</p>
                                    <img alt='dp' src={user.dp} className='dp-msg' />
                                </div>
                                <div>
                                    <p>{message.reply}</p>
                                </div>
                            </div> :
                            <div key={i} className='chat-box-foreign-head'>
                                <div>
                                    <p>{message.reply}</p>
                                </div>
                                <div key={i} className='chat-box-foreign'>
                                    <img alt='dp' src={message.user.dp} className='dp-msg' />
                                    <p>{message.message}</p>
                                </div>
                                <FontAwesomeIcon onClick={() => {
                                    setOpenEmoji((prev) => {
                                        return { ...prev, open: !prev.open, messageId: i }
                                    });
                                }} className='emoji-icon' icon={faFaceSmile} />
                                {openEmoji.open && openEmoji.messageId === i && <Emoji reactEmojiToMessage={reactEmojiToMessage} messageId={i} toggleEmoji={toggleEmoji} />}

                            </div>
                    ))}
                </div>
            </div>

            <div className='chat-controllers'>
                <button id="emoji-input" onClick={() => setEmoji(!emoji)}><FontAwesomeIcon icon = {faFaceSmile} style ={{width:"20px", height:"20px"}} /></button>

                <input id='chat-input' type='text' placeholder='Enter msg' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button id='chat-input-btn' onClick={sendMessage}>Send</button>
            </div>
            {emoji && (
                            <EmojiPicker 
                                onEmojiClick={handleEmojiInput}
                                className = "emoji-picker"
                            />
                        )
                }
        </div>
    )
}
