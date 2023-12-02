import React from 'react'
import Navigation from "../Navbar/Navigation";
import Feed from '../Feed/Feed';
import OnlineFiends from '../OnlineFriends/OnlineFriends';
import postConstants from '../../Constants/PostConstants';
import './Home.css';
const Home = () => {
  //   ref = { ref }
  //   style = {
  //                 {
  //     opacity: isInView ? 1 : 0.5,
  //       transform: isInView ? 'translateY(0px)' : 'translateY(-20px)',
  //         scale: isInView ? 1 : 0.8,
  //                 }
  // }
  return (
    <div id='main-section'>
      <OnlineFiends />
      <div id='right-section'>
        <Navigation />
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
