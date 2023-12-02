import React from 'react'
import Navigation from "../Navbar/Navigation";
import Feed from '../Feed/Feed';
import './Home.css';
const Home = () => {
  return (
    <div>
      <Navigation />
      <div id='feed-section'>
        <Feed />
        <Feed />
        <Feed />
      </div>
    </div>
  )
};
export default Home;
