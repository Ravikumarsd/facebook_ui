import React, { Component } from 'react'
import Button from './Button';
import Page from './Page';
import CreatePage from './CreatePage';
import {Panel} from 'react-bootstrap'

//538715949931003 appid
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
  testSubscription=()=>{
    window.FB.api('/259309364937810/subscribed_apps',
    'POST',
    {subscribed_fields:'name'},
    {access_token:"EAAHp9ZATUmfsBABL3uvKlRqxOdV0Tou6bbZBvz4hqiZCh4nbKjxfDf6hoD5feHqhTm4OhwZAXsSom1FVyAKfbh3ZCfgsxvK4m33kiovwvpbC8DfIegtlA9uForsbQkNSUMPAL8EdKRZA7LfKDDvZBpzhy6nJMx4F58I19sXZCyX6ldCIMzSrZC5YzaZAkMmtSCWeGRUhFAMzO8CwZDZD"},
      response => {
       console.log(response)
      }
    )
}
  testAPI = () => {
      window.FB.api('/me/accounts/',
      'GET',
       {fields:"name,access_token,id,picture{url},is_webhooks_subscribed"},
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

      <button onClick={this.testSubscription}>subscribe</button>
      </div>
    )
  }
}
