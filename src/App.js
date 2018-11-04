import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    name:'ravi'
  }
  onButtonClick = () =>{
  fetch("https://facebook-apii.herokuapp.com/signin",{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      name:this.state.name
     })
  })
  .then(response => response.json())
  .then(console.log)
}
  render() {
    return (
      <div className="App">
        
        <h1>Front end  deployed.</h1>
        <button onClick={this.onButtonClick}>Fetch</button>
      </div>
    );
  }
}


export default App;
