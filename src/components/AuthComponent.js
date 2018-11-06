import React, { Component } from 'react'
import FBButton from './FBButton';
export default class AuthComponent extends Component {
  state = {
    status:''
  }
    componentDidMount() {
      document.addEventListener("FBObjectReady",this.initLogin)
     
    }


//   initLogin = () => {
//     window.FB.getLoginStatus(response => this.onStatusChange(response))
//   }

// onStatusChange = (response)=>{
//   this.setState({status:response.status})
// }

    initLogin = () => {
      window.FB.Event.subscribe('auth.login', this.loginEvent);
      window.FB.Event.subscribe('auth.logout', this.logoutEvent);
    }
      loginEvent = (response) =>{
       console.log("login_event");
       console.log(response.status);
       console.log(response);
      }

       logoutEvent = (response)  => {
        console.log("logout_event");
        console.log(response.status);
        console.log(response);
      }
        render() {
    return (
      <div>
        <div>
                <input type="button" 
                       value="Login" 
                       onClick={()=>window.FB.login()}/>
                <br/>
                <input  type="button" 
                        value="Logout" 
                        onClick={()=>window.FB.logout()}/>
        </div>
      </div>
    )
  }
}


