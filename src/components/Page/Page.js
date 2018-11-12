import './Page.css'
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar'
import {Button} from 'react-bootstrap'
import {subscribed_fields} from './subscribed_fields'
import {ListGroupItem} from 'reactstrap'

 export default class Page extends Component {
   state={
     isSubscribed:false,
     id:'',
     token:'',
     picture:'',
     name:''
   }
   
    postSubscriptionFields = (id,token,picture,name) => {  
       fetch(`https://graph.facebook.com/v3.2/${id}/subscribed_apps`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            subscribed_fields: subscribed_fields.map(sf=>sf),
            access_token:token
          })
        })
        .then(response => response.json())
        .then(data=>
          this.setState({isSubscribed:data.success,id,token,picture,name})
          ,this.props.pageid(id,picture,name))   
        }

      deleteSubscriptionFields = (id,token) => {
        fetch(`https://graph.facebook.com/v3.2/${id}/subscribed_apps`,{
          method:'DELETE',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            subscribed_fields: subscribed_fields.map(sf=>sf),
            access_token:token
          })
        })
        .then(response => response.json())
        .then(data=> 
            this.setState({isSubscribed:!data.success}),
          )
      }
     render() {
         const {name,picture,id,token} = this.props
         const {isSubscribed} = this.state
        return (
          <ListGroupItem >
            <div className='page'>
                  <div className='avatar'>
                    <Avatar  alt="picture"  src={picture} />
                  </div>
                  <div className='name'>
                    <p><a className="link" href={`https://www.facebook.com/${id}`} rel="noopener noreferrer" target='_blank'>{name}</a></p>
                  </div>
                  {
                    (!isSubscribed) ?
                  <div className='btn'>
                      <Button 
                      onClick={this.postSubscriptionFields.bind(this,id,token,picture,name,isSubscribed)}>CONNECT TO PAGE</Button>
                  </div>
                    :
                  <div className='btn'>
                      <Button onClick={this.deleteSubscriptionFields.bind(this,id,token)}>DISCONNECT</Button>
                  </div>
                }       
            </div>
            
      </ListGroupItem>
    );
   }
}