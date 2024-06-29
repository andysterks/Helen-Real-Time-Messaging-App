import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Authorization/Login";
import Register from "./Components/Authorization/Register";
import HomePage from "./Components/HomePage";
import ChatDisplay from "./Components/ChatHomePage/ChatDisplay";
import Chats from "./Components/ChatHomePage/Chats";
import  "./Components/Authorization/Auth.css";

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/HomePage' element={<HomePage />} />
          <Route path='/ChatDisplay' element={<ChatDisplay />} />
          <Route path='/Chats' element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
