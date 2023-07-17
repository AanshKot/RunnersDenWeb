import { useEffect, useState } from "react";


export default function ProgressBar({stepNum,fillRate,isRunning}){
    const [filled,setFilled] = useState(0);
    

    
    useEffect(()=>{
       if (filled <= 100 && isRunning){
            setTimeout(() => setFilled(prev => prev += fillRate),50);
       }
    },[filled,isRunning]);

    return(
        <div className="progressbar-container">
            <div className={stepNum > 1 ? "fully-loaded" : "progressbar"}>
                <div className="progressbar-loaded" style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: "#FFF",
                    transition:"width 0.5s"
                }}></div>
                {/* <span className="progressPercent">{ filled }%</span> */}
            </div>

            <div className={stepNum >= 2 ? "fully-loaded" :"progressbar"}>

                
            </div>

            <div className={stepNum > 3 ? "fully-loaded" : "progressbar"}>
                {stepNum === 3 && (
                    <div className="progressbar-loaded" style={{
                    height: "100%",
                    width: `${filled}%`,
                    backgroundColor: "#FFF",
                    transition:"width 0.5s"
                }}></div>
                ) }

                
            </div>

            <div className={stepNum === 4 ? "fully-loaded" :"progressbar"}>

                
            </div>
        
        </div>
    );

}