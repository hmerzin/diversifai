import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  HANDSHAKE,
  // CALCULATE,
  CONNECTION
} from './events';
import startData from '../data/start';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import Results from './components/Results';
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

  styles = {
    appWrapper: {
      display: 'flex',
      height: '100vh',
      flexDirection: 'column'
    }
  }

  render() {
    return (
      <div style={this.styles.appWrapper}>
        <Search onSubmit={this.startCalculation}/>
        { this.state.data ? <Results data={this.state.data} /> : <FavoriteSites/> }
      </div>
    )
  }
}

export default App;
