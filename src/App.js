import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    home:'home',
    data:''
  }
  onButtonClick = () =>{
  fetch("https://facebook-apii.herokuapp.com/home",{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      home:this.state.home
     })
  })
  .then(response => response.json())
  .then( data => {
     this.setState({data:data})
  })
}
  render() {
    return (
      <div className="App">
        <h1>Front end  deployed.</h1>
        <button onClick={this.onButtonClick}>Fetch</button>
        <h1>{this.state.data}</h1>
      </div>
    );
  }
}

export default App;
