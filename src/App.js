import React, { Component } from 'react';
import './App.css';
import FacebookLoginButton from './components/FacebookLoginButton'
class App extends Component {
  
  state = {
    username: ''
  };
  buttonClicked = () =>{
    console.log("Button clicked");
  }
onFacebookLogin = (loginStatus, resultObject) => {
  if(loginStatus === true) {
    this.setState({
      username: resultObject.user.name
    });
  } else {
    alert('Facebook login error');
  }
}
  render() {
    const { username } = this.state;
    return (
      <div className="App">
        {(!username.length) ? 
        <div>
          <FacebookLoginButton>
            <button onClick={this.buttonClicked}>Facebook</button>
          </FacebookLoginButton>
        </div>
        :
        <div>
          <p>Welcome back ,{username} </p>
        </div> 
      }
    </div>
    );
  }
}

export default App;
