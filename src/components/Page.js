import './Page.css'
import React from 'react';
import Avatar from '@material-ui/core/Avatar'
import {Button} from 'react-bootstrap'
 const  Page = ({name,picture}) => {
        return (
        <div className='page'>
            <div className='avatar'>
              <Avatar  alt="elon"  src={picture} />
            </div>
            <div className='name'>
              <p>{name}</p>
            </div>
            <div className='button'>
                <Button>CONNECT TO PAGE</Button>
            </div> 
        </div>
    );
   }

   export default Page;
