import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const [recievedMessages, setRecievedMessages] = useState([])
  const [name, setName] = useState('')
  const [dice, setDice] = useState([])
  const [diceValue, setDiceValue] = useState(0)
  
  useEffect(() => {
    socket.on('message-recieve', (data) => {
      setRecievedMessages([...recievedMessages, { user: data.user, message: data.message, dice: data.dice}])
    })
  }, [recievedMessages])
  
  
  const sendMessage = () => {
    socket.emit('message-send', {user: name, message: message, dice: false})
    setRecievedMessages([...recievedMessages, {user: 'Du', message: message, dice: false}])
    setMessage('')
  }

  const sendRoll = (diceNumber) => { 
    var rolledNumber = Math.floor(Math.random() * diceNumber) + 1;
    socket.emit('message-send', {user: name, message: rolledNumber, dice: true})
    setRecievedMessages([...recievedMessages, { user: 'Du', message: rolledNumber, dice: true}])
   }

  const addDice = () => {
    setDice([...dice, diceValue])
  }

  const [message, setMessage] = useState('')
  
  return (
    <div>
      <div>
        <input placeholder='Name....' onChange={(e) => { setName(e.target.value) }} value={name}/>
      </div>
      Schicke eine Nachricht:
      <input placeholder='Message....' onChange={(e) => { setMessage(e.target.value) }} value={message}/>
      <button onClick={sendMessage}>Nachricht Abschicken</button>
      <div>
        <button onClick={addDice}>Würfel hinzufügen</button>
        <input type="number" value={diceValue} onChange={(e) => { setDiceValue(e.target.value) }}/>
        <div>{dice.map((item, key) => { return(<button key={"würfel"+key} onClick={(e) => { sendRoll(item) }} >W{item}</button>) })}</div>
      </div>
      <div>
        <ul>
          {recievedMessages.map((item, key) => { 
            if(!item.dice) {
              if(item.user === 'Du') {
                return(<li key={"message"+key}>{'Du sagst: ' + item.message}</li>)
              } else {
                return(<li key={"message"+key}>{item.user + ' sagt: ' + item.message}</li>)
              }
            }else {
              if(item.user === 'Du') {
                return(<li key={"message"+key}>{'Du hast eine: ' + item.message + ' gewürfelt.'}</li>)
              }else {
                return(<li key={"message"+key}>{item.user + ' hat eine: ' + item.message + ' gewürfelt.'}</li>)
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;