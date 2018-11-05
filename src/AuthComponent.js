import React, { Component } from 'react'


export default class AuthComponent extends Component {
    componentDidMount(){
            window.fbAsyncInit = () => {
                const  {init,Event} = window.FB;
                init({
                  appId            : '2000847070214153',
                  autoLogAppEvents : true,
                  xfbml            : true,
                  version          : 'v3.2',
                  frictionlessRequests:true
                });

              Event.subscribe('auth.statusChange',(response) => {
                  if(response) {
                      this.updateLoggedInState(response)
                  } else {
                      this.updateLoggedOutState(response)
                  }
              });
            };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.2&appId=2000847070214153';
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
        }
    
        updateLoggedInState = (response) =>{
            console.log("user logged in");
            console.log(response);
        }    
        updateLoggedOutState =(response)=>{
            console.log("user loged out");
            console.log(response);
        }
        render() {
    return (
      <div>
          <div className="fb-login-button" 
                data-max-rows="1" 
                data-size="large" 
                data-button-type="continue_with" 
                data-show-faces="false" 
                data-auto-logout-link="true" 
                data-use-continue-as="false"></div>
      </div>
    )
  }
}
