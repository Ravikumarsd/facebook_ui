import React, { Component } from 'react';
import './App.css';
import AuthComponent from './components/AuthComponent';
class App extends Component { 
  render() {
    return (
      <div className="App">
          <AuthComponent/> 
      </div>
    );
  }
}

export default App;