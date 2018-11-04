import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Facebook extends Component {
   
    responseFacebook = response => {
            this.setState({
                isLogedIn:true,
                userID:response.userID,
                name:response.name,
                picture:response.picture.data.url
            })
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
            fbContent = (
                <div style={{
                    width: '400px',
                    margin: 'auto',
                    background: '#f4f4f4',
                    padding:'20px'
                }}>
                    <img src={this.state.picture} alt={this.state.name}/>
                    <h2>Welcome {this.state.name}</h2>
                    <p>Email:{this.state.email}</p>
                </div>
            );
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
