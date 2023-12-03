import React, { useEffect, useState } from 'react'
import Navigation from "../Navbar/Navigation";
import Feed from '../Feed/Feed';
import OnlineFiends from '../OnlineFriends/OnlineFriends';
import postConstants from '../../Constants/PostConstants';
import MiniNavigation from '../Navbar/MiniNavigation';
import MiniOnlineFriends from '../OnlineFriends/MiniOnlineFriends';
import './Home.css';
const Home = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const windowSize = window.innerWidth;
    if (windowSize < 992) {
      setMobile(true);
    }
  }, []);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const handleOnlineFriends = () => {
    setOnlineUsers(!onlineUsers);
  }
  return (
    <div id='main-section'>
      {mobile ? onlineUsers ? <MiniOnlineFriends /> : <></> : <OnlineFiends />}
      <div id='right-section'>
        <div id='feed-section'>
          {postConstants.map(post => (
            <div key={post.id}>
              <Feed data={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
export default Home;
