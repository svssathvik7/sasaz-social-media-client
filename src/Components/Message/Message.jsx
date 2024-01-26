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
        <div className='chat-holder'>
            {messages.map((message,i)=>(
                <div className='chat-block' key={i}>
                    <p>{message.user}</p>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
      <div className='chat-controllers'>
        <input type='text' placeholder='Enter msg' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
