import React from 'react';
import Navbar from './navbar';
import ChatBox from './chatbox';
import './App.css';

function App() {
  return (
    <div className="App space-y-4">
      <Navbar className="w-full"/>
      <div className="w-full">
        <ChatBox/>
      </div>
    </div>
  );
}

export default App;
