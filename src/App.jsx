import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://desturo.de");


function App() {

  const [recievedMessages, setRecievedMessages] = useState([])
  const [name, setName] = useState('')
  const [dice, setDice] = useState([])
  const [diceValue, setDiceValue] = useState(1)
  
  useEffect(() => {
    socket.on('message-recieve', (data) => {
      setRecievedMessages([...recievedMessages, { user: data.user, message: data.message, dice: data.dice, diceValue: data.diceValue}])
    })
  }, [recievedMessages])
  
  
  const sendMessage = () => {
    socket.emit('message-send', {user: name, message: message, dice: false, diceValue: null})
    setRecievedMessages([...recievedMessages, {user: 'Du', message: message, dice: false, diceValue: null}])
    setMessage('')
  }

  const sendRoll = (diceNumber) => { 
    var rolledNumber = Math.floor(Math.random() * diceNumber) + 1;
    socket.emit('message-send', {user: name, message: rolledNumber, dice: true, diceValue: diceNumber})
    setRecievedMessages([...recievedMessages, { user: 'Du', message: rolledNumber, dice: true, diceValue: diceNumber}])
  }

  const changeNumber = (up, number, setNumber, min = false, minValue = null) => {

    if (up) {
      setNumber(number + 1)
    }else {
      if (min) {
        number - 1 <= 0 ? setNumber(number) : setNumber(number - 1)
      }
    }
}

  const addDice = () => {
    setDice([...dice, diceValue])
  }

  const [message, setMessage] = useState('')
  
  return (
    <div>
      <div>
        <input id='nameInput' placeholder='Name....' onChange={(e) => { setName(e.target.value) }} value={name}/>
      </div>
      <label id='messageLabel' htmlFor="messageInput">Nachricht Schicken</label>
      <input id='messageInput' placeholder='Message....' onChange={(e) => { setMessage(e.target.value) }} value={message}/>
      <button id='sendMessage' onClick={sendMessage}>Senden</button>
      <div>
        <button id='addDiceButton' onClick={addDice}>Würfel hinzufügen</button>
        <button id='numberDown' onClick={() => { changeNumber(false, diceValue, setDiceValue, true, 0) }}>{"-"}</button>
        <input min={1} type="number" value={diceValue} onChange={(e) => { setDiceValue(e.target.value)}}/>
        <button id='numberUp' onClick={() => { changeNumber(true, diceValue, setDiceValue, true, 0) }}>{"+"}</button>
        <div>{dice.map((item, key) => { return(<button key={"würfel"+key} onClick={() => { sendRoll(item) }} >W{item}</button>) })}</div>
      </div>
      <div id='messageContainer'>
        <ul id='messageList'>
          {recievedMessages.map((item, key) => { 
            if(!item.dice) {
              if(item.user === 'Du') {
                return(<li key={"message"+key}>{'Du sagst: ' + item.message}</li>)
              } else {
                return(<li key={"message"+key}>{item.user + ' sagt: ' + item.message}</li>)
              }
            }else {
              if(item.user === 'Du') {
                return(<li key={"message"+key}>{'Du hast mit einem W' + item.diceValue + ' eine: ' + item.message + ' gewürfelt.'}</li>)
              }else {
                return(<li key={"message"+key}>{item.user + ' hat mit einem W' + item.diceValue +' eine: ' + item.message + ' gewürfelt.'}</li>)
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;