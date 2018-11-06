import React from 'react'

  const FBButton = () => {
  return (
    <div>
<div      className="fb-login-button" 
          data-max-rows="1" data-size="large" 
          data-button-type="continue_with" 
          data-show-faces="false" 
          data-auto-logout-link="true" 
          data-use-continue-as="false">
</div> 
        <fb-login-button 
            scope="public_profile,email" 
            onlogin="checkLoginState();">
        </fb-login-button>
</div>
  )
}
export default FBButton;
