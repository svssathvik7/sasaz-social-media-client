import React from 'react'
import Navigation from "../Navbar/Navigation";
import Feed from '../Feed/Feed';
import OnlineFiends from '../OnlineFriends/OnlineFriends';
import './Home.css';
const Home = () => {
  return (
    <div id='main-section'>
      <OnlineFiends />
      <div id='right-section'>
        <Navigation />
        <div id='feed-section'>
          <Feed />
          <Feed />
          <Feed />
        </div>
      </div>
    </div>
  )
};
export default Home;
