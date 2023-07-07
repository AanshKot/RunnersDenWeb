import { useState,useRef, useEffect } from "react";


import MobilityButtons from "../components/MobilityButtons";
import { faCheck,faTimes,faInfoCircle, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeFont, FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import TOS from '../components/TOS';
import UserPool from "../UserPool";
import { Auth } from "aws-amplify";
import VerifyAccount from "../components/VerifyAccount";

// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;






export default function SignUp({onVerify}) {
  const [hideTOSparagraph, setHideTOSparagraph] = useState(false);
  const [showTOS,setShowTOS] = useState(false);

  // const emailRef = useRef();
  const errRef = useRef();

  const [email,setEmail] = useState("");



  const [pwd,setPwd] = useState("");
  const [validPwd,setValidPwd] = useState(false);
  const [pwdFocus,setPwdFocus]  = useState(false);

  const [matchPwd,setMatchPwd] = useState("");
  const [validMatch,setValidMatch] = useState(false);
  const [matchFocus,setMatchFocus] = useState(false);

  const [errMsg,setErrMsg] = useState("");

  const [success,setSuccess] = useState(false);
  

 
  const [verifyAcc,setVerifyAcc] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  },[pwd,matchPwd])



  const handleClick = () => {
    setShowTOS(!showTOS);
  };

  function handleValChange() {
    setHideTOSparagraph(!hideTOSparagraph);
    setShowTOS(!showTOS);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const initial_pref = JSON.stringify({"brands":[],"size":null,"gender":null});
    
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: pwd,
        // attributes: {
        //   'custom:preferences':initial_pref
        // }
      });
      
      // onSignUp();
      setVerifyAcc(true);
      
    } catch (error) {
      console.log(error);
      setErrMsg("An account with this email already exists");
    }
  };

  return (
    <div className="content">
      
     
        <div className="titleContainer">
        <MobilityButtons renderNext={false} backLink={"Start"} nextLink={""} />
        <div className="header">
            <h1 className="freeGuest">Create Your Free Account</h1>
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

        { verifyAcc && <VerifyAccount email={email} pwd={pwd} onVerify={onVerify}/>}
        
        
        
        
        {!showTOS && (
          <div className="sign-form">
            
          <div className={errMsg ? "errmsg-container" : "offscreen"}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"><FontAwesomeIcon icon={faWarning}/>{errMsg}</p>
          </div>
            
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input autoComplete="off" className="formInput" type="email" value={email} id="email" placeholder="Enter Email..." onChange={(e) => setEmail(e.target.value)}  required />


                <p id="pwdnote" className= {pwdFocus && !validPwd ? "instructions" : "offscreen"}> <FontAwesomeIcon icon={faInfoCircle}/>8 to 24 characters.<br/> Must include upper and lowercase letters.<br/> Must include a digit from 0-9.</p>
                <input className="formInput" type="password" value={pwd} id="password" placeholder="Enter Password" onChange={(e) => setPwd(e.target.value)} aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)}  required />
                

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}><FontAwesomeIcon icon={faInfoCircle}/>Must match the first password info screen.</p>
                <input className="formInput" type="password" id="confirmpassword" value={matchPwd} placeholder="Confirm Password" onChange={(e) => setMatchPwd(e.target.value)} aria-invalid={validMatch ? "false" : "true"} aria-aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)}  required />
              </div>

              <div className="submit-form">
                <button className= {(!validPwd || !validMatch) ? "disabled" : "submit-button"} disabled = {(!validPwd || !validMatch)}>Sign Up</button>
                  
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
        <TOS  handleChange={handleValChange}/>
      )}
    
          

    </div>
    
    )
    
}