import React, { Component } from 'react'
import Button from './Button';
import Page from './Page';
import CreatePage from './CreatePage';
import {Panel} from 'react-bootstrap'
export default class AuthComponent extends Component {
  state = {
    status: '',
    data:[]
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
    console.log(this.state.status);
  }
  
  loginEvent = response => this.statusChangeCallback(response)
  logoutEvent = response => this.statusChangeCallback(response)

  testAPI = () => {
      window.FB.api('/me/accounts/',
      'GET',
       {"fields":"name,access_token,id,picture{url}"},
       response => {
        if(response && !response.error) {
           console.log(response)
           let data = [...response.data]
           this.setState({data})
          }
      })
  }

  render() {
    const {data,status} = this.state;
    let name = data.map(data => 
          <Page
            key={data.id}
            name={data.name}
            picture={data.picture.data.url}  
          />
      )
    return (
      <div>        
      {(status === 'connected') ?
        <Button value={"Logout"} click={()=>window.FB.logout()}/>
       :<Button value={"Continue with Facebook"} click={()=>window.FB.login()}/>
       }
    
       {(status === 'connected')?
        <div style={{marginTop:'10px'}}>
         <Panel>
            <Panel.Body><CreatePage/></Panel.Body>
              <Panel.Footer style={{backgroundColor:'white'}}>
              {name}
              </Panel.Footer>
          </Panel>
        </div>:null
      }
      </div>
    )
  }
}
