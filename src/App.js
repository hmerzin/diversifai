import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
 
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import io from 'socket.io-client';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Entry/>
      </MuiThemeProvider>
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

class Entry extends Component {
  render() {
    return (
      <div>
        <Search/>
        <FavoriteSites/>
      </div>
    )
  }
}

export default App;
