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

import '../styles/index.css';

let socket;

socket = io('localhost:3001', {reconnect: true}); // run nodemon server/index.js

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
    this.state = {};
    this.handleResponse = this.handleResponse.bind(this);
    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    socket.on('recieve_results', this.handleResponse);
  }

  handleResponse(data) {
    this.setState({
      data: data
    });
    console.log(this.state);
  }

  startCalculation(url) {
    socket.emit('calculate', url);
  }

  styles = {
    appWrapper: {
      display: 'flex',
      height: '100vh',
      weight: '100vw',
      flexDirection: 'column',
      backgroundColor: 'white',
      color: '#4aa397'
    },
    headerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    bodyWrapper: {
      display: 'flex',
      flexDirection: 'column'
    }
  }

  render() {
    return (
      <div style={this.styles.appWrapper}>
        <div style={this.styles.headerWrapper}>
          <div style={{'padding': 20, textAlign: 'center'}}>
            <h2>Data-Driven Diversity</h2>
            <span>
              We empower anyone to discover how websites represent minorities.
            </span>
          </div>
          <Search onSubmit={this.startCalculation}/>
        </div>
        <div style={this.styles.bodyWrapper}>
          { this.state.data ? <Results data={this.state} /> : null }
        </div>
      </div>
    )
  }
}

export default App;
