import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    name:'ravi',
    data:''
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
