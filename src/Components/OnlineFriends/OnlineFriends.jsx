import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { userContextProvider } from '../Contexts/UserContext';
import axios from 'axios';
import "./OnlineFriends.css";
export default function OnlineFriends() {
  const { user } = useContext(userContextProvider);
  return (
    <div id='online-friends'>
      <h2 style={{ marginBottom: '1em' }} id='online-friends-heading'>Online Friends</h2>
      <div id='online-friends-scroller'>
        {user && user.friends && user.friends.length !== 0 ? user.friends.map(frnd => (
          <div key={frnd.id} id='friend-div'>
            <img alt={"Dp"} src={frnd.dp} style={{ width: '50px', height: '50px' }} />
            <h4>{frnd.name}</h4>
          </div>
        )) : <p style={{ color: 'white' }}>No Friends</p>}
      </div >
    </div >
  )
}

