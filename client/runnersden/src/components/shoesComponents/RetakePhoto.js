import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

function RetakePhoto({errMsgContent}) {

  const navigate = useNavigate();

  // Function to navigate to the /leftfoot URL after a delay
  const redirectTo = (errMsgContent) => {
    // navigate('/leftfoot');

    if(errMsgContent === "One or more required values are null, please redo your preferences and reselect your paper sizing mat."){
      navigate("/preferences")
    }

    else{
      navigate("/leftfoot")
    }
  };

  // Trigger the navigation after 4 seconds
  useEffect(()=>{
    setTimeout(() => redirectTo(errMsgContent), 3000);
  },[]);
  

  return (
    <div className="popup">
    <div className='overlay'></div>

    <div className='verify-content'>
      <p className='verify-header'>There was an error</p>
      <p className='verify-text'>
        {errMsgContent}
      </p>

    </div>
    
  </div>
  )
}

export default RetakePhoto