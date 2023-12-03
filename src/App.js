import './App.css';
import Home from "../src/Components/Home/Home";
import { Route, Routes } from 'react-router-dom';
import Search from './Components/Search/Search';
import Explore from './Components/Explore/Explore';
import Message from './Components/Message/Message';
import Profile from './Components/Profile/Profile';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/search' exact Component={Search} />
        <Route path='/explore' exact Component={Explore} />
        <Route path='/message' exact Component={Message} />
        <Route path='/profile' exact Component={Profile} />
      </Routes>
    </div>
  );
}

export default App;
