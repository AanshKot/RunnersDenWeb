import { useState,useRef, useEffect,useContext } from "react";


import MobilityButtons from "../components/MobilityButtons";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import TOS from '../components/TOS';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "aws-amplify";







export default function Login({ onSignIn }) {
  const [hideTOSparagraph, setHideTOSparagraph] = useState(false);
  const [showTOS,setShowTOS] = useState(false);  
  
  const errRef = useRef();
  
  const [email,setEmail] = useState("");
  
  const [pwd,setPwd] = useState("");
  const [errMsg,setErrMsg] = useState("");
 
  const handleClick = () => {
    setShowTOS(!showTOS);
  };

  function handleValChange() {
    setHideTOSparagraph(!hideTOSparagraph);
    setShowTOS(!showTOS);
  }

  const signIn = async () => {
    try{
      const user = await Auth.signIn(email,pwd);
      onSignIn();
    }
    catch (err) {
      console.log("Error signing in ", err);
      setErrMsg("Username or password was incorrect.");
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    signIn();   
  };

  return (
    <div className="content">
      
     
        <div className="titleContainer">
        <MobilityButtons renderNext={false} backLink={"Start"} nextLink={""} />
        <div className="header">
            <h1 className="freeGuest">Sign In</h1>
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
          <div className="sign-form">
            
            <div className={errMsg ? "errmsg-container" : "offscreen"}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"><FontAwesomeIcon icon={faWarning}/>{errMsg}</p>
            </div>
            
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input autoComplete="off" className="formInput login-input" type="email" value={email} id="email" placeholder="Enter Email..." onChange={(e) => setEmail(e.target.value)}  required />


               
                <input className="formInput login-input" type="password" value={pwd} id="password" placeholder="Enter Password" onChange={(e) => setPwd(e.target.value)} required />
                
              </div>

              <div className="submit-form">
                <button className="submit-button">Sign In</button>
                  
                  { !hideTOSparagraph && (
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
            

          </div>
        )}

      {showTOS && (
        <TOS returnUrl={"Start"} handleChange={handleValChange}/>
      )}
    
          

    </div>
    
    )
    
}