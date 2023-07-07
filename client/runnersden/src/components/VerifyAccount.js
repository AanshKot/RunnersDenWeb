// this will be a pop-up appearing on the Sign Up page
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth } from 'aws-amplify';
import { useState,useRef } from 'react';


export default function VerifyAccount({email,pwd,onVerify}) {
  const [code, setCode] = useState('');
  
  const [errMsg,setErrMsg] = useState("")

  const errRef = useRef();

  console.log(email);

  const verifyEmailValidationCode = async (code) => {
    
    try {
      await Auth.confirmSignUp(email,code);
      
      onVerify(email,pwd);
      console.log('Email verified');
    } catch (error) {
      console.log('Verification failed with error:', error);
      setErrMsg("Invalid verification code")
    }
  };

  const requestNewVerificationCode = async () => {
    try {
      await Auth.resendSignUp(email);
      console.log('New verification code requested');
    } catch (error) {
      console.log('Failed to request new verification code:', error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmailValidationCode(code);
  };


  

  return (
    <div className="popup">
      <div className='overlay'></div>

      <div className='verify-content'>
        <p className='verify-header'>Verify Your Email Address</p>
        <p className='verify-text'>
          An email with a verification code has been sent to your registered email address. Please enter the code below to complete the verification process.
        </p>

        <div className={errMsg ? "errmsg-container" : "offscreen"}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"><FontAwesomeIcon icon={faWarning}/>{errMsg}</p>
        </div>

        <form className='verify-form' onSubmit={handleSubmit}>
          <input
            className='input-verify'
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6 digit verification code"
          />
          <button className={code.toString().length !== 6  ? "disabled" : "submit-button"} disabled={code.toString().length !== 6}>Verify</button>
        </form>

        <button className='submit-button resend-code' onClick={requestNewVerificationCode}>Request new code</button>
      </div>
      
    </div>
  );
}