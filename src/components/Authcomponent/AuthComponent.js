import React, { Component } from 'react'
import FacebookButton from '../FacebookButton/FacebookButton';
import Page from '../Page/Page';
import CreatePage from '../Createpage/CreatePage';
import {ListGroup} from 'reactstrap';
import MessengerButton from '../MessengerButton/MessengerButton';

//538715949931003 appid
export default class AuthComponent extends Component {
  state = {
    status: '',
    data:[],
    access_token:[],
    subscribedPageID:'',
    picture:'',
    subscribedPageName:'',
    isSubscribed:false,

  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initialiseLogin)
  }
  componentWillUnmount() {
    document.removeEventListener('FBObjectReady', this.initialiseLogin)
  }

  getSubscribedPageId = (subscribedPageID,picture,subscribedPageName) => {
    this.setState({subscribedPageID,picture,subscribedPageName})
    
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
           
           console.log(data)

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
  
onClick=()=>{
  //console.log(this.state.isSubscribed)
}
  render() {
    const {data,status,subscribedPageID,isSubscribed,subscribedPageName,picture,token} = this.state;
    let name = data.map(data => 
          <Page
            pageid={this.getSubscribedPageId.bind(this)}
            key={data.id}
            name={data.name}
            picture={data.picture.data.url}
            id={data.id}
            token={data.access_token}  
          />
      )

    return (
      <div> 
        {(status === 'connected')?
        <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'20px'}}>       
          <MessengerButton subscribedPageID={subscribedPageID}/>
        </div>:null
        }
      {(status === 'connected') ?
        <FacebookButton value={"Logout"} click={()=>window.FB.logout()}/>
       :<FacebookButton value={"Continue with Facebook"} click={()=>window.FB.login()}/>
       }
       {(status === 'connected')?
        <div style={{marginTop:'10px'}}>
              <ListGroup flush>
                  <CreatePage/>
                   {name}   
              </ListGroup>
        </div>:null
      }
      </div>
    )
  }
}
