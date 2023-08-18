import MobilityButtons from "../MobilityButtons";
import Instructions12 from "../../static/images/InstructionsStep1and2.mp4"
import ProgressBar from "../ProgressBar";
import { useState } from "react";
function Step1() {
    const [isRunning,setIsRunning] = useState(true);

    const handlePause = () => {
        setIsRunning(false);
    }

    const onPlay = () => {
        setIsRunning(true);
    }

    return (
        <div className="content">
            

            <div className="titleContainer">
                <ProgressBar isRunning={isRunning} fillRate={0.35} stepNum={1} />
                <MobilityButtons renderNext={true} backLink={"startscans"} nextLink={"instructions/2"} />
            <div className="header">
                <h1 className="freeGuest">Set Up Instructions</h1>
            </div>
            </div>

            <div className="instructions-vid-container">
            <video className="instructions-video" controls playsInline autoPlay={true} onPause={handlePause} onPlay={onPlay}>
                <source src={Instructions12} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            </div>
        </div>

    )
}

export default Step1