import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { userContextProvider } from '../Contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import "./OnlineFriends.css";
function OnlineFrndsTemplate() {
  const { user } = useContext(userContextProvider);
  return <div>
    <h2 style={{ marginBottom: '1em' }} id='online-friends-heading'>Online Friends</h2>
    <div id='online-friends-scroller'>
      {user && user.friends && user.friends.length !== 0 ? user.friends.map(frnd => (
        <div key={frnd._id} id='friend-div'>
          <img alt={"Dp"} src={frnd.dp} style={{ width: '50px', height: '50px' }} />
          <h4>{frnd.name}</h4>
        </div>
      )) : <p style={{ color: 'white' }}>No Friends</p>}
    </div>
  </div>
}
export default function OnlineFriends() {
  const [mobile, setMobile] = useState(false);
  const [openFrnds, setOpenFrnds] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 992) {
      setMobile(true);
    }
  }, [window.innerWidth]);
  const openFriendsSideBar = () => {
    setOpenFrnds((prevValue) => {
      return !prevValue;
    });
  }
  return (
    <div id='online-friends'>
      {mobile && (!openFrnds ? <FontAwesomeIcon onClick={openFriendsSideBar} icon={faBars} /> : <FontAwesomeIcon onClick={openFriendsSideBar} icon={faXmark} />)}
      {mobile && openFrnds && <OnlineFrndsTemplate />}
      {!mobile && <OnlineFrndsTemplate />}
    </div >
  )
}

