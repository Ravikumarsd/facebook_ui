import React, { Component } from 'react'

export default class Dummy extends Component {
    componentDidMount() {
        window.fbAsyncInit = () => {
              const  {init,api,login,logout} = window.FB;
              init({
                appId            : '2000847070214153',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.2',
                frictionlessRequests:true
              });
              login(response => this.onLogin(response),{scope: 'public_profile,email'});
         };
      }
      onLogout=(response) => {
        console.log(response);
      }
      onLogin=(response)=>{
        if (response.authResponse) {
          console.log(response);
         window.FB.api('/me', function(response) {
            console.log(response);
          });
         } else {
          console.log('User cancelled login or did not fully authorize.');
         }
      }
  render() {
    return (
      <div>
      </div>
    )
  }
}
