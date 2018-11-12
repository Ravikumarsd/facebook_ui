import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import './CreatePage.css';
import {ListGroupItem} from 'reactstrap'
 class  CreatePage extends Component{
     render(){
  return (
      <ListGroupItem>
    <div>
            <div className='createpage'>
            <div className='bpa'>
                 <p style={{fontSize:'20px'}}>Bot Publishing</p>
                </div>
                 <div className='cbtn'>
                    <a href='https://www.facebook.com/pages/creation/' rel="noopener noreferrer" target='_blank'><Button
                    >
                        CREATE A FACEBOOK PAGE
                    </Button></a>
                </div>
          </div>
           <p style={{color:'gray',fontWeight:'bold',marginTop:'10px',marginBottom:'-8px'}}>YOUR FACEBOOK PAGES</p>
       </div>
    </ListGroupItem>
  )
}
}

export default CreatePage;
