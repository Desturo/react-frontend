import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const [recievedMessages, setRecievedMessages] = useState([])
  const [name, setName] = useState('')
  
  useEffect(() => {
    socket.on('message-recieve', (data) => {
      setRecievedMessages([...recievedMessages, { user: data.user, message: data.message}])
    })
  }, [recievedMessages])
  
  
  const sendMessage = () => {
    socket.emit('message-send', {user: name, message: message})
    setRecievedMessages([...recievedMessages, message])
    setMessage('')
  }

  

  const [message, setMessage] = useState('')

  
  
  return (
    <div>
      <div>
        <input placeholder='Name....' onChange={(e) => { setName(e.target.value) }} value={name}/>
      </div>
      Send a message:
      <input placeholder='Message....' onChange={(e) => { setMessage(e.target.value) }} value={message}/>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <ul>
          {recievedMessages.map((item, key) => { return(<li>{item.user + ' said: ' + item.message}</li>) })}
        </ul>
      </div>
    </div>
  );
}

export default App;