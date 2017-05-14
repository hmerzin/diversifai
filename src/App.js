import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  HANDSHAKE,
  // CALCULATE,
  CONNECTION
} from './events';
import startData from './data/start';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import io from 'socket.io-client';

let socket;

socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js
socket.emit(CONNECTION);
socket.emit(HANDSHAKE, {
  hi: 'dude',
  whats: 'up?'
});

socket.on('handshake', (data) => {
  console.log('server handshake: ', data);
});

class App extends Component {
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
    this.state = startData;

    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    socket.on('display_results', this.displayResults);
  }

  displayResults(data) {
    console.log(data);
  }

  startCalculation(url) {
    socket.emit('calculate', url);
  }

  render() {
    return (
      <div>
        <div style={{'padding': 20}}>
          <h2>Data-Driven Diversity</h2>
          <h4>Analyze the Gender & Race Representation of any brand.</h4>
        </div>
        <Search onSubmit={this.startCalculation}/>
        <FavoriteSites/>
      </div>
    )
  }
}

export default App;
