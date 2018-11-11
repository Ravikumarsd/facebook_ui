import './Page.css'
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar'
import {Button} from 'react-bootstrap'
import {subscribed_fields} from './subscribed_fields'
 export default class Page extends Component {
    
    postSubscriptionFields = (id,token) => {  
        fetch(`https://graph.facebook.com/v3.2/${id}/subscribed_apps`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            subscribed_fields: subscribed_fields.map(sf=>sf),
            access_token:token
          })
        })
        .then(response => response.json())
        .then(data=>console.log(data,id))
      }
     render(){
         const {name,picture,id,token} = this.props
        return (
        <div className='page'>
            <div className='avatar'>
              <Avatar  alt="elon"  src={picture} />
            </div>
            <div className='name'>
              <p>{name}</p>
            </div>
            <div className='button'>
                <Button onClick={this.postSubscriptionFields.bind(this,id,token)}>CONNECT TO PAGE</Button>
            </div> 
        </div>
    );
   }
 }