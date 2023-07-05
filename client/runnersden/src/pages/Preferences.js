import React from 'react'
import MobilityButtons from '../components/MobilityButtons';

function Preferences({brandPreferences}) {
  
    return (
    <div className="content preferences">
      
     
    <div className="titleContainer">
      <MobilityButtons renderNext={false} backLink={"overview"} nextLink={""} />
      <div className="header">
        <h1 className="freeGuest larger-header">Help Us Find your Perfect Shoe Fit...</h1>
      </div>
    </div>
    

    <p className='sub-title'>What are your favorite shoes?</p>
    
    <div className='brands-selection'>
        <p className='sub-heading'>Choose your favorite brands</p>

        
    </div>
  </div>
  );
}

export default Preferences