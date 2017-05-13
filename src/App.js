import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import FavoriteSites from './components/FavoriteSites'
import Search from './components/Search'

class App extends Component {
  render() {
    return (
        <div className="App">
        <Search/>
        <FavoriteSites/>
      </div>
    );
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