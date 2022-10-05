//import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_SERVER_URL);
console.log(process.env.REACT_APP_SERVER_URL);


function App() {

  const sendMessage = () => {
    console.log(socket.id)
  }
  
  return (
    <div>
      Test
      <input placeholder='Message....'/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;