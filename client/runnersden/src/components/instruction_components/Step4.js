import MobilityButtons from "../MobilityButtons"
import ProgressBar from "../ProgressBar"



function Step4() {
  return (
    <div className="content">
      <div className="titleContainer">
        <ProgressBar stepNum={4} />
        <MobilityButtons
          renderNext={true}
          backLink={"instructions/3"}
          nextLink={"leftfoot"}
        />

        <div className="header">
          <h1 className="freeGuest" style={{color:"#2DBC50"}}>
            Instructions Summary
          </h1>
        </div>

        <div className="paragraph">
            <p className="paragraph-desc">1.Take off your shoes</p>
            <p className="paragraph-desc">2.Stand on the sizing mat/paper in your socks</p>
            <p className="paragraph-desc">3.Place one foot in the white sizing square, with your heel against the wall.</p>
            <p className="paragraph-desc">4.Hold your phone level to the ground, at hip height, with the camera facing down</p>
            <p className="paragraph-desc">5.Make sure the white sizing square is straight and within the box</p>
            <p className="paragraph-desc">6.Take the photo!</p>

        </div>


      </div>
    </div>
  )
}

export default Step4