import { useNavigate } from "react-router-dom";

import FootScanGif from "../static/images/scanfoot.gif";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Shoes from "../static/images/homeshoes.png";


function Home({isLoggedIn}) {
    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    return (
        <div className="separate-content">
            <div className="content">
                <div className="titleContainer">
                    <div className="header">
                        <h1 className="freeGuest ">Home</h1>
                    </div>
                </div>

                <div className="sub-content">
                    <div className="subgif-content">
                        <img className="gif" src={FootScanGif} alt="animated gif"></img>
                    </div>

                    <Button classname={"submit-button"} link={"\startscans"} buttonText={"Start Scanning"} />
                </div>

                <div className="sub-content">
                    <div className="subgif-content">
                        <img className="gif" src={Shoes} alt="animated gif"></img>
                    </div>

                    <Button classname={"submit-button"} link={"\startscans"} buttonText={"Start Scanning"} />
                </div>

            </div>

            <Navbar location={"home"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
  )
}

export default Home