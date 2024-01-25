import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { userContextProvider } from '../Contexts/UserContext';
import axios from 'axios';
import "./OnlineFriends.css";
export default function OnlineFriends() {
  const { user } = useContext(userContextProvider);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (user && user.email) {
      axios.post('http://localhost:5001/api/user/getallfrnds', { email: user.email })
        .then(response => {
          if (response.data.status) {

            setFriends(response.data.friends);
          } else {
            console.log(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [user]);
  return (
    <div id='online-friends'>
      {/* <h2 id='online-friends-heading'>Online Friends</h2> */}
      <div id='online-friends-scroller'>
        {friends.map(frnd => (
          <div key={frnd.id} id='friend-div'>
            <img alt={"Dp"} src={frnd.dp} style={{ width: '50px', height: '50px' }} />
            <h4>{frnd.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

