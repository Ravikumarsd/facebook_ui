import React from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons';
import './FacebookButton.css'
const FacebookButton=({value,click})=> {
  return (
    <div className="fbbutton">
        <FacebookLoginButton
          onClick={click}
          activeStyle={{ background: 'rgb(59,91,150)' }}
          style={{background: 'rgb(42,144,237)'}}>
          <span>{value}</span>
        </FacebookLoginButton>
   </div>
  )
}

export default FacebookButton;