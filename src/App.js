import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {HANDSHAKE, CALCULATE, CONNECTION} from './events';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import io from 'socket.io-client';

let socket;

class App extends Component {

  componentDidMount() {
    socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js
    socket.emit(CONNECTION);
    socket.emit(HANDSHAKE, {
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

  constructor(props) {
    super(props);
    this.state = {
      url: false
    }

    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js
    socket.emit('connection');
  }

  startCalculation(url) {
    socket.emit('calculate', url);
    socket.on('display_results', (data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <Search onSubmit={this.startCalculation}/>
        <FavoriteSites/>
      </div>
    )
  }
}

export default App;
