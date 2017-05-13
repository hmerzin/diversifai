import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import io from 'socket.io-client';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search/>
        <FavoriteSites/>
      </div>
    );
  }

  componentDidMount() {
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
}

class Wrapper extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>

    )
  }
}

export default Wrapper;
