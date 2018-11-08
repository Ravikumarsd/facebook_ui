import React, { Component } from 'react'
import {Button} from 'react-bootstrap';
import './CreatePage.css';
 class  CreatePage extends Component{
     render(){
  return (
    <div>
            <div className='createpage'>
            <div className='bpa'>
                 <p style={{fontSize:'20px'}}>Bot Publishing</p>
                </div>
                 <div className='button'>
                    <a href='https://www.facebook.com/pages/creation/'><Button
                    >
                        CREATE A FACEBOOK PAGE
                    </Button></a>
                </div>
          </div>
           <p style={{color:'gray',fontWeight:'bold'}}>YOUR FACEBOOK PAGES</p>
    </div>
  )
}
}

export default CreatePage;
