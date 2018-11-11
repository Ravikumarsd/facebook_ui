import React, { Component } from 'react'
import Button from '../Button/Button';
import Page from '../Page/Page';
import CreatePage from '../Createpage/CreatePage';
import {Panel} from 'react-bootstrap'

//538715949931003 appid
export default class AuthComponent extends Component {
  state = {
    status: '',
    data:[],
    access_token:[]
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
          Event.subscribe('auth.login',  this.loginEvent)
          Event.subscribe('auth.logout', this.logoutEvent)
  }

  statusChangeCallback = response => 
  {
    if(response.status === 'connected') {
      this.getPageDetails();
    }
    this.setState({ status: response.status })
    console.log(this.state.status);
  }
  
  loginEvent = response => this.statusChangeCallback(response)
  logoutEvent = response => this.statusChangeCallback(response)
  
 
  //getting page details
  getPageDetails = () => {
      window.FB.api('/me/accounts/',
      'GET',
       {fields:"name,access_token,id,picture{url}"},
       response => {
        if(response && !response.error) {
           //console.log(response)
           let data = [...response.data]
           this.setState({data})
           let access_token = []
           
           data.map(data => access_token.push(data.access_token))
           let token=[...access_token]
           this.setState({access_token:token})

           //send access_tokens to backend
           fetch('https://facebook-apii.herokuapp.com/access_token',{
             method:'POST',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({
              access_token:this.state.access_token
             })
           })
           .then(response=>response.json())
           .then(console.log)
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
            id={data.id}
            token={data.access_token}  
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
            <Panel.Body>
                <CreatePage/>
            </Panel.Body>
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
