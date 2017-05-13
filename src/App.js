import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import FavoriteSites from './components/FavoriteSites'
import Search from './components/Search'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
 
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

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
