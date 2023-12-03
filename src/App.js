import './App.css';
import Home from "../src/Components/Home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './Components/Search/Search';
import Explore from './Components/Explore/Explore';
import Message from './Components/Message/Message';
function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' exact Component={Home} />
        <Route path='/search' exact Component={Search} />
        <Route path='/explore' exact Component={Explore} />
        <Route path='/message' exact Component={Message} />
      </Routes>
    </div>
  );
}

export default App;
