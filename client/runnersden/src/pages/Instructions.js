import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar"

import Instructions345 from "../static/images/Instructions_part_3_4_5.mp4";
import { useState } from "react";
import Step1 from "../components/instruction_components/Step1";
import NoPage from "./NoPage";
import Step2 from "../components/instruction_components/Step2";
import Step3 from "../components/instruction_components/Step3";
import Step4 from "../components/instruction_components/Step4";




function Instructions({isLoggedIn}) {
  const { step } = useParams();


  
  const navigate = useNavigate();

  const handleClick = (url) => {
      navigate(url);
  }

  const isValidStep = [undefined,'1', '2', '3', '4'].includes(step);

  return (
    <div className="separate-content">
            
            {(step === undefined || step == "1") && <Step1 />}
            {(step === "2") && <Step2/>}
            {(step === "3") && <Step3 />}
            {(step === "4") && <Step4 />}
            {!isValidStep && <NoPage />}

          

            <Navbar location={"startscans"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
  )
}

export default Instructions