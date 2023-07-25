import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"



function Confirmation() {
    const { type } = useParams();

    const [navLink,setNavLink] = useState("/rightfoot");

    const navigate = useNavigate();

    const handleClick =  async () => {
         window.history.replaceState(null, null, navLink); // Use replaceState to navigate without mounting on top
         window.location.reload(); // Reload the page to reflect the new URL
      };
    

    useEffect(()=>{
        if(type === "R"){
            setNavLink("/myshoes");
        }
        else{
            setNavLink("/rightfoot");
        }

        console.log()
    },[type])

    return (
        <div className="content" style={{
            background: "#2DBC50;"
        }}>
           
           
            <div className="titleContainer">

            {(type === undefined || type == "L") ?                         
                        <div className="header">
                            <h1 className="freeGuest " style={{
                                color:"#FFF",
                                textAlign:"center",
                                fontFamily:"Poppins",
                                fontSize:"36px",
                                fontWeight:"700",
                                lineHeight:"normal"


                            }}>Left Foot</h1>
                        </div> :
                        <div className="header">
                            <h1 className="freeGuest " style={{
                                color:"#FFF",
                                textAlign:"center",
                                fontFamily:"Poppins",
                                fontSize:"36px",
                                fontWeight:"700",
                                lineHeight:"normal"
                            }}>Right Foot</h1>
                        </div>

            }

            </div>

            <FontAwesomeIcon icon={faCheck} style={{
                color:"#FFF",width:"50%",height:"50%"
            }} className="confirmation-check" />

            <button onClick={handleClick} className="submit-button" style={{ background : "#FFF",color:"#2DBC50",border:"none" }} >Continue</button>
            
        </div>
    )
}

export default Confirmation