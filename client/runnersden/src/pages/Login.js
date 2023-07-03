import { useState,useRef, useEffect,useContext } from "react";
import { AccountContext } from "../components/Account";

import MobilityButtons from "../components/MobilityButtons";


import TOS from '../components/TOS';







export default function Login() {
  const [hideTOSparagraph, setHideTOSparagraph] = useState(false);
  const [showTOS,setShowTOS] = useState(false);


  const { authenticate } = useContext(AccountContext);
  
  
  const errRef = useRef();

  const [email,setEmail] = useState("");



  const [pwd,setPwd] = useState("");

  const [errMsg,setErrMsg] = useState("");
  const [success,setSuccess] = useState(false);

  




  const handleClick = () => {
    setShowTOS(!showTOS);
  };

  function handleValChange() {
    setHideTOSparagraph(!hideTOSparagraph);
    setShowTOS(!showTOS);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    authenticate(email,pwd).then(data => {
        console.log("Logged in!", data);
    }).catch(err => {
        console.error("Failed to login",err);
        setErrMsg("Email or password is incorrect");
    })

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
            {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}

            
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