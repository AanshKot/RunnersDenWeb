import MobilityButtons from "../MobilityButtons";
import Instructions345 from "../../static/images/Instructions_part_3_4_5.mp4"
import ProgressBar from "../ProgressBar";
import { useState } from "react";

function Step3() {
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
                <ProgressBar isRunning={isRunning} fillRate={0.13} stepNum={3} />
                <MobilityButtons renderNext={true} backLink={"instructions/2"} nextLink={"instructions/4"} />
            <div className="header">
                <h1 className="freeGuest">Foot Scan Instructions</h1>
            </div>
            </div>

            <div className="instructions-vid-container">
            <video className="instructions-video" controls autoPlay={true} onPause={handlePause} onPlay={onPlay}>
                <source src={Instructions345} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            </div>
        </div>

    )
}

export default Step3