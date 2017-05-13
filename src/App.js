import React, { Component } from 'react';
// import logo from './logo.svg';
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

export default App;
