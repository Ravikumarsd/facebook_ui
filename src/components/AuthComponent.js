import React, { Component } from 'react'
import Button from './Button';

export default class AuthComponent extends Component {
  state = {
    status: '',
  }
  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initialiseLogin)
  }
  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initialiseLogin)
  }

  initialiseLogin = () => {
    const {getLoginStatus,Event} = window.FB
          getLoginStatus(response => this.statusChangeCallback(response))
          Event.subscribe('auth.login', this.loginEvent)
          Event.subscribe('auth.logout', this.logoutEvent)
  }

  statusChangeCallback = response => 
  {
    if(response.status === 'connected') {
      this.testAPI();
    }
    this.setState({ status: response.status })

  }

  testAPI = () =>{
      window.FB.api('/me/accounts/',
      'GET',
       {"fields":"name,access_token,id"},
       response=>{
        if(response && !response.error) {
            let data = [...response.data]
            let names = data.map( data => data.name)
            
            let tokens = data.map(data => data.access_token)
            
            let ids = data.map(data => data.id)
            
            names.map(name => console.log(name))
            tokens.map(token => console.log(token))
            ids.map(id=>console.log(id))
          
          }
      })
  }
  loginEvent = response => this.statusChangeCallback(response)
  logoutEvent = response => this.statusChangeCallback(response)
  render() {
    const {status} = this.state;
    return (
      <div>        
      {(status === 'connected') ?
        <Button value={"Logout"} click={()=>window.FB.logout()}/>
       :<Button value={"Continue with Facebook"} click={()=>window.FB.login()}/>
       }
       <h1>{status}</h1>
       <p></p>
        </div>
    )
  }
}
