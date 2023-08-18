import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

function RetakePhoto() {

  const navigate = useNavigate();

  // Function to navigate to the /leftfoot URL after a delay
  const redirectToLeftFoot = () => {
    navigate('/leftfoot');
  };

  // Trigger the navigation after 4 seconds
  useEffect(()=>{
    setTimeout(redirectToLeftFoot, 3000);
  },[]);
  

  return (
    <div className="popup">
    <div className='overlay'></div>

    <div className='verify-content'>
      <p className='verify-header'>There was an error with your foot scan!</p>
      <p className='verify-text'>
        You will be redirected to redo your footscans shortly.
      </p>

    </div>
    
  </div>
  )
}

export default RetakePhoto