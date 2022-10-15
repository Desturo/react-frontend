import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const [recievedMessages, setRecievedMessages] = useState([])
  
  useEffect(() => {
    socket.on('message-recieve', (data) => { 
      console.log('User: ' + data.user);
      console.log('Message: ' + data.message);
      setRecievedMessages([...recievedMessages, data.message])
    })
  }, [recievedMessages])
  
  
  const sendMessage = () => {
    socket.emit('message-send', message)
    setRecievedMessages([...recievedMessages, message])
    setMessage('')
  }

  

  const [message, setMessage] = useState('')

  
  
  return (
    <div>
      Send a message:
      <input placeholder='Message....' onChange={(e) => { setMessage(e.target.value) }} value={message}/>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <ul>
          {recievedMessages.map((item, key) => { return(<li>{item}</li>) })}
        </ul>
      </div>
    </div>
  );
}

export default App;