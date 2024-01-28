import React, { useContext } from 'react'
import Feed from '../Feed/Feed';
import OnlineFiends from '../OnlineFriends/OnlineFriends';
import './Home.css';
import { userContextProvider } from '../Contexts/UserContext';
const Home = () => {
  const { user } = useContext(userContextProvider);
  return (
    <div id='main-section'>
      <OnlineFiends />
      <div id='right-section'>
        <div id='feed-section'>
          {user && user.posts && user.posts.map((post, ind) => (
            <div key={ind}>
              <Feed data={post} name={user.name} dp={user.dp}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
export default Home;
