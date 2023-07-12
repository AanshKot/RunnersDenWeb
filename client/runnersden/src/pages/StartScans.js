import { useEffect } from "react"
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FootScanGif from "../static/images/scanfoot.gif";
import Button from "../components/Button";


function StartScans({onLoad,isLoggedIn}) {
//   useEffect(() => {
//     onLoad();
//   },[onLoad]);
  
    
    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    return (
        <div className="separate-content">
            <div className="content">
                <div className="titleContainer">
                    <div className="header">
                        <h1 className="freeGuest ">Find your perfect fit by scanning your feet</h1>
                    </div>
                </div>

                <div className="gif-content">
                    <img className="gif" src={FootScanGif} alt="animated gif"></img>
                </div>

                <Button classname={"submit-button"} link={"\instructions"} buttonText={"Start Scans"} />
                
            </div>

            <Navbar location={"startscans"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
  )
}

export default StartScans