import React, { Component } from 'react'
export default class Home extends Component {
    componentDidMount() {
        window.fbAsyncInit = () => {
              const  {init} = window.FB;
              init({
                appId            : '2000847070214153',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.2',
                frictionlessRequests:true
              });
            };
      }
          logOutClick =() =>{
            window.FB.logout(response => 
                this.props.sendData(response.status))
        }
    render() {
        return (
            <div>
                <h1>Welcome to My App.</h1>
                <button onClick={this.logOutClick}>Logout</button>
            </div>
        )
    }
}