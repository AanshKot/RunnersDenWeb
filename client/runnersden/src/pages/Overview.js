

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useSpring , animated } from "react-spring";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";

function Overview() {
 
    const  AssessLoggedInState = () => {
        Auth.currentAuthenticatedUser().then(sess => {
          
          console.log("user is logged in");
          Auth.signOut();
        }).catch(() => {
         
          console.log("user isn't logged in");
        });
      }
    
      useEffect(() => {
        AssessLoggedInState()
      },[])

  
  const props = useSpring({
    to: {opacity: 1, y:0},
    from : { opacity: 0, y:100},
    delay: 1000,
  });

  const props2 = useSpring({
    to: {opacity: 1, y:0},
    from : { opacity: 0, y:100},
    delay: 2500,
  })

  const props3 = useSpring({
    to: {opacity: 1, y:0},
    from : { opacity: 0, y:100},
    delay: 3500,
  })

  
  
  return (
    <div className="content overview-page">
        <div className="titleContainer">
            <animated.div style={props} className="header">
                <h1 className="freeGuest smaller-header">Find your perfect fit in 3 steps</h1>
            </animated.div>

            <animated.div className="overview-content" style={props2}>
                <p className="overview-line">1.Take foot scans with your camera to find your foot size/shape</p>

                <div className="down-arrow">
                    <FontAwesomeIcon icon={faArrowDown} className="down-icon" size="2x" />
                </div>

                <p className="overview-line">2.We test how your foot fits in every shoe.</p>
                
                <div className="down-arrow">
                    <FontAwesomeIcon icon={faArrowDown} className="down-icon" size="2x" />
                </div>


                <p className="overview-line">3.Buy the right shoe using your custom shoe reccommendations.</p>
            </animated.div>
        
            <animated.div className="overview-content" style={props3}>
                <Button classname={"submit-button overview-button"} link={"preferences"} buttonText={"Continue"} />
            </animated.div>


        </div>


    </div>
  )
}

export default Overview