import React, { Component } from 'react';
import './App.css';
import AuthComponent from './components/AuthComponent';


class App extends Component {
  state = {
    status:''
  }
  getData = (status)=>{
    this.setState({status:status})

  }
  render() {
    return (
      <div className="App">
          <AuthComponent sendData = {this.getData.bind(this)}/>     

         <h1>{this.state.status}</h1> 
      </div>
    );
  }
}

export default App;