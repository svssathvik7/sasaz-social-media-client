import './App.css';
import Home from "../src/Components/Home/Home";
import { Route, Routes } from 'react-router-dom';
import Search from './Components/Search/Search';
import Explore from './Components/Explore/Explore';
import Message from './Components/Message/Message';
import Profile from './Components/Profile/Profile';
import { useEffect, useState } from 'react';
import Navigation from './Components/Navbar/Navigation';
import MiniNavigation from './Components/Navbar/MiniNavigation';
import Authentication from './Components/Authentication/Authentication';
import UserContext from './Components/Contexts/UserContext';
import UserPostContext from './Components/Contexts/UserPostContext';
import TotalUsersContext from './Components/Contexts/TotalUsersContext';
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
      <UserContext>
        <UserPostContext>
          <Navigation handleOnlineFriends={handleOnlineFriends} />
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/auth' exact Component={Authentication} />
            <Route path='/search' exact element={<TotalUsersContext><Search /></TotalUsersContext>} />
            <Route path='/explore' exact Component={Explore} />
            <Route path='/message' exact Component={Message} />
            <Route path='/profile' exact Component={Profile} />
          </Routes>
          {mobile && <MiniNavigation />}
        </UserPostContext>
      </UserContext>
    </div>
  );
}

export default App;
