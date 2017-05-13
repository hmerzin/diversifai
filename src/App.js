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

let socket;

function startCalculation(url) {
  console.log(socket);
}

class App extends Component {

  componentDidMount() {
    socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js
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
      <MuiThemeProvider>
        <Entry/>
      </MuiThemeProvider>
    );
  }
}

class Entry extends Component {
  render() {
    return (
      <div>
        <div style={{'padding': 20}}>
          <h2>Data-Driven Diversity</h2>
          <h4>Analyze the Gender & Race Representation of any brand.</h4>
        </div>
        <Search onSubmit={startCalculation}/>
        <FavoriteSites/>
      </div>
    )
  }
}

export default App;
