import React, { Component } from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons';

export default class AuthComponent extends Component {
  state = {
    status: ''
  }
  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initialiseLogin)
  }
  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initialiseLogin)
  }

  initialiseLogin = () => {
    const {getLoginStatus,Event} = window.FB;
          getLoginStatus(response => this.statusChangeCallback(response));
          Event.subscribe('auth.login', this.loginEvent);
          Event.subscribe('auth.logout', this.logoutEvent);
  }

  statusChangeCallback = response => { console.log(response); this.setState({ status: response.status }) }
  loginEvent = response => this.statusChangeCallback(response);
  logoutEvent = response => this.statusChangeCallback(response);

  render() {
    const {status} = this.state;
    return (
      <div>
        {status}
        {(status === 'connected') ?
        <FacebookLoginButton
          onClick={() => window.FB.logout()}
          activeStyle={{ background: 'rgb(59,91,150)' }}
          style={{background: 'rgb(42,144,237)' }}>
          <span>Logout</span>
        </FacebookLoginButton>
      :
        <FacebookLoginButton
          onClick={() => window.FB.login()}
          activeStyle={{ background: 'rgb(59,91,150)' }}
          style={{ background: 'rgb(42,144,237)' }}>
          <span>Continue with facebook</span>
        </FacebookLoginButton>
      }
      </div>
    )
  }
}
