import React from 'react'
import { FacebookLoginButton } from 'react-social-login-buttons';
 const Button=({value,click})=> {
  return (

        <FacebookLoginButton
          onClick={click}
          activeStyle={{ background: 'rgb(59,91,150)' }}
          style={{ background: 'rgb(42,144,237)' }}>
          <span>{value}</span>
        </FacebookLoginButton>

  )
}

export default Button;