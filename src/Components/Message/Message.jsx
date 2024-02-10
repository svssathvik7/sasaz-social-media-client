import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { useState, useEffect } from 'react'
import { userContextProvider } from '../Contexts/UserContext';
import ScrollToBottom from 'react-scroll-to-bottom'
import { css } from '@emotion/css';
import io from 'socket.io-client';
import { emoji } from './Emoji';
import { useInView } from 'framer-motion';
import "./Message.css";
import EmojiPicker from 'emoji-picker-react';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const socket = io.connect("http://localhost:5001");
const ROOT_CSS = css({
    height: 600,
    width: 400
});
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
    const scrollTrigger = useRef();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user } = useContext(userContextProvider);
    const [client, setClient] = useState(user);
    const [emoji, setEmoji] = useState(false);
    const [roomChat, setRoomChat] = useState();
    const changeMessageScreen = () => {
        if (scrollTrigger.current) {
            console.log(scrollTrigger.current);
            scrollTrigger.current.scrollTop = scrollTrigger.current.scrollHeight;
        }
    }
    const fetchMessages = async (uniqueChatId) => {
        try {
            const response = (await axios.post("http://localhost:5001/api/chat/messages/", {
                chatId: uniqueChatId
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
    const handleEmojiInput = (emojiObj) => {
        try {
            const newMessage = message + emojiObj.emoji;
            setMessage(newMessage);
        } catch (err) {
            console.log(err);
        }
    }

    const sendMessage = async (e) => {
        try {
            e.preventDefault();
            const userId = user._id;
            socket.emit('send_message', { message, roomChat, userId });
            const chatInput = document.getElementById('chat-input');
            chatInput.value = '';
            chatInput.focus();
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
        changeMessageScreen();
        const data = response.data;
        console.log(data);
    }
    const makeChatRoom = (frnd) => {
        const uniqueId = [user._id, frnd._id].sort();
        const uniqueChatId = uniqueId[0] + uniqueId[1];
        setRoomChat(uniqueChatId);
        socket.emit('join_chat_room', { roomChat: uniqueChatId });
        fetchMessages(uniqueChatId);
    }
    useEffect(
        () => {
            socket.on('receive_message', (data) => {
                const messageObject = data.messageObject;
                setMessage([...messages, messageObject]);
                fetchMessages(data.data.roomChat);
            });

        }
        , [socket]);
    return (
        <div id='chat-container'>
            <div id="major-chat-container">
                <div id='friends-container'>
                    <h2>My Friends</h2>
                    {user && user.friends && user.friends.map((frnd, i) => (
                        <div id={frnd} key={i} onClick={() => {
                            setClient(frnd);
                            makeChatRoom(frnd);
                        }} className='frnd-data'>
                            <img alt='dp' src={frnd?.dp} className='dp' />
                            <p>{frnd?.name}</p>
                            <div className='active-dot'></div>
                            {/* <div className='offline-dot'></div> */}
                        </div>
                    ))}
                </div>
                <div className='chat-holder'>
                    <div className='client-details'>
                        <img src={client?.dp} alt='dp' className='client-dp' />
                        <p className='client-name'>{client?.name}</p>
                    </div>
                    <ScrollToBottom className='css-rhsi9a '>
                        {messages && messages.length && messages.map((message, i) => {
                            return message.user._id === user._id ?
                                <span key={i} className='chat-box-native-head'>
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
                                </span> :
                                <span key={i} className='chat-box-foreign-head'>
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

                                </span>
                        })}
                    </ScrollToBottom>
                </div>
            </div>

            <div className='chat-controllers'>
                <button id="emoji-input" onClick={() => setEmoji(!emoji)}><FontAwesomeIcon icon={faFaceSmile} style={{ width: "20px", height: "20px" }} /></button>

                <form onSubmit={sendMessage}>
                    <input id='chat-input' type='text' placeholder='Enter msg' autoFocus onChange={(e) => setMessage(e.target.value)} />
                    <button id='chat-input-btn' type='submit'>Send</button>
                </form>
            </div>
            {emoji && (
                <EmojiPicker
                    onEmojiClick={handleEmojiInput}
                    className="emoji-picker"
                />
            )
            }
        </div>
    )
}
