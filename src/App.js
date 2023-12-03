import './App.css';
import Home from "../src/Components/Home/Home";
import { Route, Routes } from 'react-router-dom';
import Search from './Components/Search/Search';
import Explore from './Components/Explore/Explore';
import Message from './Components/Message/Message';
import Profile from './Components/Profile/Profile';
import { useEffect, useState } from 'react';
import Navigation from './Components/Navbar/Navigation';
import MiniOnlineFriends from './Components/OnlineFriends/MiniOnlineFriends';
import OnlineFriends from './Components/OnlineFriends/OnlineFriends';
import MiniNavigation from './Components/Navbar/MiniNavigation';
function App() {
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
    <div className="App">
      <Navigation handleOnlineFriends={handleOnlineFriends} />
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/search' exact Component={Search} />
        <Route path='/explore' exact Component={Explore} />
        <Route path='/message' exact Component={Message} />
        <Route path='/profile' exact Component={Profile} />
      </Routes>
      {mobile && <MiniNavigation />}
    </div>
  );
}

export default App;
