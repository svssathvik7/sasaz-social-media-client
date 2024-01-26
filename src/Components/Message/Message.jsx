import axios from 'axios';
import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { userContextProvider } from '../Contexts/UserContext';
import "./Message.css"
export default function Message() {
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const {user} = useContext(userContextProvider);
    const fetchMessages = async ()=>{
        try {
            const response = (await axios.get("http://localhost:5001/api/chat/messages/")).data;
            if(response.status){
                setMessages(response.data);
            }
            else{
                console.log('Error fetching messages:');
            }
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    }

    const sendMessage = async ()=>{
        try {
            // console.log(user);
            const result = await axios.post("http://localhost:5001/api/chat/addMessage/",{
                user : user._id,
                message : message
            });
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.log('Error fetching messages:', error);
        }
    }

    useEffect(
        ()=>{
            fetchMessages();
            const interval = setInterval(() => {
                fetchMessages();
            }, 2000);
            return () => clearInterval(interval);
        }
    ,[user])
  return (
    <div id='chat-container'>
        <div id='online-friends'>
            {user && user.friends && user.friends.length !== 0 ? user.friends.map(frnd => (
                <div key={frnd._id} id='friend-div'>
                <img alt={"Dp"} src={frnd.dp} style={{ width: '50px', height: '50px' }} />
                <h4>{frnd.name}</h4>
                </div>
            )) : <p style={{ color: 'white' }}>No Friends</p>}
            </div>
        <div id="chat">
            <div className='chat-holder'>
                {messages.map((message,i)=>(
                    <div className='chat-block' key={i}>
                        <p>{message.user}</p>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
            <div className='chat-controllers'>
                <div><input type='text' placeholder='Enter msg' value={message} onChange={(e) => setMessage(e.target.value)}/></div>
                <div><button onClick={sendMessage}>Send</button></div>
            </div>
        </div>
    </div>
  )
}
