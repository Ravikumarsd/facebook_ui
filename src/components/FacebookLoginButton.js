import React, { Component } from 'react'

export default class FacebookLoginButton extends Component {
  
  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
    console.log("I am inside ComponentDidMount");
  }

  componentWillUnMount() {
    document.removeEventListener('FBObjectReady', this.initializeFacebookLogin);
    console.log("I am inside ComponentWillUnMount");
  }

  initializeFacebookLogin = () => {
    this.FB = window.FB
    console.log("I am inside initialize facebookLogin")
    this.checkLoginStatus();
  }

  checkLoginStatus =()=>{
    this.FB.getLoginStatus(this.facebookLoginHandler);
    console.log("I am inside checkloginstatus")
  }

  facebookLogin = () => {
      if(!this.FB) return;
        this.FB.getLoginStatus(response => {
          if(response.status === 'connected') {
            this.facebookLoginHandler(response);
          } else {
            this.FB.login(this.facebookLoginHandler,{scope: 'public_profile'});
          }
        },);
        console.log("I am inside facebookLogin")
      }

  facebookLoginHandler = response => {
    if (response.status === 'connected') {
      this.FB.api('/me', userData => {
        let result = {
          ...response,
          user: userData
        };
        this.props.onLogin(true, result);
      });
    } else {
      this.props.onLogin(false);
    }
  }
  render() {
    let {children} = this.props;
    return (
      <div onClick={this.facebookLogin}>
          {children}
      </div>
    )
  }
}
