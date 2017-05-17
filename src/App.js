import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  HANDSHAKE,
  // CALCULATE,
  CONNECTION
} from './events';







// json for testing
// var cl_json = require('./sample_output.json');

// ethnicity counter
var ethnicity_counter = {
  'white': 0,
  'black or african american': 0,
  'american indian or alaska native': 0,
  'native hawaiian or pacific islander': 0,
  'middle eastern or north african': 0,
  'asian': 0,
  'hispanic, latino, or spanish origin': 0,
  'other': 0
};

// gender counter
var gender_counter = {
  'feminine': 0,
  'masculine': 0
};

// age counter
var age_counter = {
  '0-4': 0,
  '5-9': 0,
  '10-14': 0,
  '15-19': 0,
  '20-24': 0,
  '25-29': 0,
  '30-34': 0,
  '35-39': 0,
  '40-44': 0,
  '45-49': 0,
  '50-54': 0,
  '55-59': 0,
  '60-64': 0,
  '65-69': 0,
  '70-74': 0,
  '75-79': 0,
  '80+': 0
};


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
    this.state = {results: false};
    this.startCalculation = this.startCalculation.bind(this);
  }

  componentDidMount() {
    //console.log(this.state);
    socket.on('res', (data) => {
      console.log('recieved');
      this.setState({
        data: startData,
        results: true
      })
      console.log('state:' + this.state);
    });
  }

  startCalculation(url) {
    this.setState({
      data: {}
    })
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
    //alert('state data: ' + JSON.stringify(this.state.data));
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
          {this.state.data && this.state.data.data ? <Results data={{data: this.state.data}} /> : null} 
        </div>
      </div>
    )
    //<Results data={{data: startData}} />
  }
}

export default App;