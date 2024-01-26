import axios from 'axios';
import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { userContextProvider } from '../Contexts/UserContext';
import "./Message.css"
export default function Message() {
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const {user} = useContext(userContextProvider);
    const [client,setClient] = useState(user);
    const fetchMessages = async ()=>{
        try {
            const names = [user.email, client.email].sort();
            const response = (await axios.post("http://localhost:5001/api/chat/messages/",{
                chatId : names[0]+names[1]
            })).data;
            if(response.status){
                setMessages(response.data.chat);
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
            const names = [user.email, client.email].sort();
            const result = await axios.post("http://localhost:5001/api/chat/addMessage/",{
                user : user._id,
                message : message,
                chatId : names[0]+names[1]
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
            console.log(messages);
        }
    ,[user,messages,message])
  return (
    <div id='chat-container'>
        <div id="major-chat-container">
            <div id='friends-container'>
                {user && user.friends && user.friends.map((frnd,i)=>(
                    <div key={i} onClick={()=>{setClient(frnd)}} className='frnd-data'>
                        <img alt='dp' src={frnd?.dp} className='dp'/>
                        <p>{frnd?.name}</p>
                    </div>
                ))}
            </div>
            <div className='chat-holder'>
                    <p className='client-name'>{client?.name}</p>
                {messages && messages.length && messages?.map((message,i)=>(
                    message.user._id == user._id ? 
                    <div key={i} className='chat-box-native'>
                        <p>{message.message}</p>
                        <img alt='dp' src={user.dp} className='dp-msg'/>
                    </div> :
                    <div key={i} className='chat-box-foreign'>
                        <img alt='dp' src={message.user.dp} className='dp-msg'/>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </div>
        
      <div className='chat-controllers'>
        <input id='chat-input' type='text' placeholder='Enter msg' value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button id='chat-input-btn' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
