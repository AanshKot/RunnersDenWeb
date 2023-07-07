import { useEffect } from "react"


function StartScans({onLoad}) {
  useEffect(() => {
    onLoad();
  },[onLoad]);
  
    return (
        <div> Start Scans </div>
  )
}

export default StartScans