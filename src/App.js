import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const send = () => {
    socket.emit('ping');
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <button onClick={ send }>Send ping</button>
    </div>
  );
}

export default App;