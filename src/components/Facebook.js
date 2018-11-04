import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Facebook extends Component {
   
    responseFacebook = response => {
            console.log(response);
    }

    componentClicked = () => {
            console.log("clicked");
   }

    state = {
        isLogedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    render() {
        let fbContent;
        if(this.state.isLogedIn) {
                fbContent = "null"
        } else {
            fbContent = (
                <FacebookLogin
                appId="2000847070214153"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
            />
            );
        }
    return (
      <div>
          {fbContent}
      </div>
    )
  }
}
