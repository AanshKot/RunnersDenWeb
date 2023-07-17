


import { useState } from "react";


import MobilityButtons from "../components/MobilityButtons";
import MeasureLogo from "../static/images/measure.png";

import TOS from '../components/TOS';



export default function SignInGuest({onGuestSignIn}) {
  const [hideTOSparagraph, setHideTOSparagraph] = useState(false);
  const [showTOS,setShowTOS] = useState(false);

  

  const handleClick = () => {
    setShowTOS(!showTOS);
  };

  function handleValChange() {
    setHideTOSparagraph(!hideTOSparagraph);
    setShowTOS(!showTOS);
  }



  return (
    <div className="content">
      
     
      <div className="titleContainer">
        <MobilityButtons renderNext={false} backLink={"Start"} nextLink={""} />
        <div className="header">
          <h1 className="freeGuest">Your Free Guest Account</h1>
        </div>
      </div>
    
      {!showTOS && hideTOSparagraph && (
        <div className="inputTOS">
                <input id="acceptTOS" name="acceptTOS" type="checkbox" checked={!showTOS} onChange={(e) => handleValChange(e.target.checked)} />
                <label className="clicktoAccept" htmlFor="acceptTOS">
                    Accepted Terms
                </label>
        </div>
      )}
      
      {!showTOS && (
        <img className="measureLogo" src={MeasureLogo} alt="MeasureFit" />
      )}
      


      
      {!showTOS && (
        <form className="sign-in-guest" onSubmit={() => onGuestSignIn()}>
          <div className="continue-TOS-container">

            
            <button className="submit-button">Sign in as Guest</button>

            {!hideTOSparagraph && (
              <div className="TOS-paragraph">
                <p className="paragraph-line">
                  For your privacy all user data is anonymized and safeguarded
                </p>
                <p className="paragraph-line">
                  By signing in you agree to our Privacy Policy and Terms of Use
                </p>
                <p className="paragraph-line underline" onClick={handleClick}>
                  Click here to view terms
                </p>
              </div>
            )}
          </div>
        </form>
      )}

     
      {showTOS && (
        <TOS  handleChange={handleValChange}/>
      )}
    
    </div>
  );
}

