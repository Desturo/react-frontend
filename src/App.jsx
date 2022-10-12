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
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla cum illo earum saepe alias culpa, eos impedit. Soluta a aperiam, nulla, odio amet quia adipisci nostrum perspiciatis deleniti perferendis quibusdam!</div>
    </div>
  );
}

export default App;