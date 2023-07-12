
import { faHouse,faCamera, faUser, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GiRunningShoe } from "react-icons/gi";



export default function Navbar({handleClick,isLoggedIn,location}){
    return(
        <div className="navbar">
            <div className="navlink" onClick={() => handleClick("/home")}>
                <FontAwesomeIcon className={location === "home" ? "selected-icon" : "deselected-icon"} icon={faHouse} />
            </div>
           
            <div className="navlink" onClick={() => handleClick("/startscans")}>
                <FontAwesomeIcon className={location === "startscans" ? "selected-icon" : "deselected-icon"} icon={faCamera} />
            </div>

            
            <div className="navlink" onClick={() => handleClick("/myshoes")}>
                <GiRunningShoe className={location === "myshoes" ? "selected-icon" : "deselected-icon"} />
            </div>


            {isLoggedIn && (         
                <div className="navlink" onClick={() => handleClick("/account")}>
                    <FontAwesomeIcon className={location === "account" ? "selected-icon" : "deselected-icon"} icon={faUser} />
                </div>
            )}

            <div className="navlink" onClick={() => handleClick("/settings")}>
                <FontAwesomeIcon className={location === "preferences" ? "selected-icon" : "deselected-icon"} icon={faGear} />
            </div>


            
        </div>
    );
}