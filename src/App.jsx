import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const sendMessage = () => {
    socket.emit('message-send', message)
    setMessage('')
  }

  socket.on('message-recieve', (data) => { 
    console.log('User: ' + data.user);
    console.log('Message: ' + data.message);
   })

  const [message, setMessage] = useState('')

  
  
  return (
    <div>
      Test
      <input placeholder='Message....' onChange={(e) => { setMessage(e.target.value) }}/>
      <button onClick={sendMessage}>Send Message</button>
      <div>Hallo das ist ein test</div>
    </div>
  );
}

export default App;