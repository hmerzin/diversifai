import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  HANDSHAKE,
  // CALCULATE,
  CONNECTION
} from './events';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import FavoriteSites from './components/FavoriteSites';
import Search from './components/Search';
import Results from './components/Results';
import io from 'socket.io-client';
import startData from '../data/start';

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
    socket.on('recieve_results', this.handleResponse);
  }

  handleResponse(data) {
    console.log('data:' + data);
  }

  startCalculation(url) {
    socket.emit('calculate', url);
  }

  styles = {
    appWrapper: {
      display: 'flex',
      height: '100vh',
      weight: '100vw',
      flexDirection: 'column'
    },
    headerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    bodyWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }
  }

  render() {
    return (
      <div style={this.styles.appWrapper}>
        <div style={this.styles.headerWrapper}>
          <div style={{'padding': 20, textAlign: 'center'}}>
            <h2>Data-Driven Diversity</h2>
            <h4>Analyze the Gender & Race Representation of any brand.</h4>
          </div>
          <Search onSubmit={this.startCalculation}/>
        </div>
        <div style={this.styles.bodyWrapper}>
          { this.state.data ? <Results data={this.state.data} /> : <FavoriteSites/> }
        </div>
      </div>
    )
  }
}

export default App;
