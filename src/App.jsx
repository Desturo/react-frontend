//import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const sendMessage = () => {
    console.log(socket.id)
  }

  
  
  return (
    <div>
      Test
      <input placeholder='Message....'/>
      <button onClick={sendMessage}>Send Message</button>
      <div>Hallo das ist ein test</div>
    </div>
  );
}

export default App;