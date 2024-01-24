import React, { useContext, useEffect, useState } from 'react'
import Navigation from "../Navbar/Navigation";
import Feed from '../Feed/Feed';
import OnlineFiends from '../OnlineFriends/OnlineFriends';
import postConstants from '../../Constants/PostConstants';
import MiniNavigation from '../Navbar/MiniNavigation';
import MiniOnlineFriends from '../OnlineFriends/MiniOnlineFriends';
import './Home.css';
import { userContextProvider } from '../Contexts/UserContext';
const Home = () => {
  const { user } = useContext(userContextProvider);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const windowSize = window.innerWidth;
    if (windowSize < 992) {
      setMobile(true);
    }
    console.log(user?.posts??[]);
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
          {user && user.posts && user.posts.map((post, ind) => (
            <div key={ind}>
              <Feed data={post} dp={user.dp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
export default Home;
