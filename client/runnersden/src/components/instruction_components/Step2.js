import { useEffect, useState } from "react";
import MobilityButtons from "../MobilityButtons";
import ProgressBar from "../ProgressBar";
import Letter from "../../static/images/LetterGreyBG.png";
import Legal from "../../static/images/LegalGreyBG.png";

function Step2() {
  const [selectedPaperSize, setSelectedPaperSize] = useState(null);
  const [renderNext, setRenderNext] = useState(false);
  const [legal_classname,setLegalClassname] = useState("initial-paper");
  const [letter_classname,setLetterClassname] = useState("initial-paper");


  useEffect(() => {
    if (selectedPaperSize) {
      setRenderNext(true);
      localStorage.setItem("paperSize",selectedPaperSize);
    } else {
      setRenderNext(false);
    }
  }, [selectedPaperSize]);

  const handlePaperSelect = (paperSize) => {
    if (selectedPaperSize === paperSize) {
      setSelectedPaperSize(null); // Unselect the currently selected paper

      if(paperSize === "Legal"){
        setLegalClassname("initial-paper");
        setLetterClassname("initial-paper");
      }

      else if(paperSize === "Letter"){
        setLetterClassname("initial-paper");
        setLegalClassname("initial-paper");
      }

    } else {
      setSelectedPaperSize(paperSize); // Select the clicked paper

      if(paperSize === "Legal"){
        setLetterClassname("unselectable");
        setLegalClassname("selected-paper")
      }

      else if(paperSize === "Letter"){
        setLegalClassname("unselectable");
        setLetterClassname('selected-paper');
      }
    }
  };

 




  return (
    <div className="content">
      <div className="titleContainer">
        <ProgressBar stepNum={2} />
        <MobilityButtons
          renderNext={renderNext}
          backLink={"instructions/1"}
          nextLink={"instructions/3"}
        />
        <div className="header">
          <h1 className="freeGuest">
            To proceed, click the paper size you are using for your foot scan
          </h1>
        </div>
      </div>



      <div className="paper-container">
        <div
          className={
            letter_classname
          }
          onClick={() => handlePaperSelect("Letter")}
        >
          <img className="paper" src={Letter} alt="letter" />
        </div>
        <div
          className={
            legal_classname
          }
          onClick={() => handlePaperSelect("Legal")}
        >
          <img className="paper" src={Legal} alt="legal" />
        </div>
      </div>
    </div>
  );
}

export default Step2;
