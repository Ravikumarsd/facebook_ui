import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const MessengerButton = ({subscribedPageID}) => {
  return (
      <div>
        <Button 
            style={{color:'white',
                    backgroundColor:'rgb(42,143,255)',
                    fontSize:'15px',
                    width:'190px',
                    height:'35px',
                    borderRadius:'8px'}}
          icon>
          <div style={{display:'flex'}}>
            <Icon style={{fontSize:'18px',marginLeft:'10px'}} name='facebook messenger' />
              <a
              style={{color:'white'}} 
              href={`https://m.me/${subscribedPageID}`}
              target='_blank'
              rel="noopener noreferrer"
              ><p style={{fontSize:'10px',marginLeft:'15px'}}>TEST THIS CHATBOT</p></a>
            </div>
          </Button>
    </div>
  )
}
export default MessengerButton;