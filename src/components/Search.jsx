import React, { Component } from 'react'
import io from 'socket.io-client';

export default class Search extends Component {
    constructor(props) {
      super(props);

      const socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js
      socket.emit('connection');
      socket.emit('handshake', {
        hi: 'dude',
        whats: 'up?'
      });

      socket.on('handshake', (data) => {
        console.log('server handshake: ', data);
      });
    }

    render() {
        return (
            <h2>Search</h2>
        )
    }
}
