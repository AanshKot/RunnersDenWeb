

export default function TOS({handleChange}){
 

    return(
        <div className="content"> 

            
            <div className="terms-container">
                <p className="terms-header">Universole Fit Terms and Conditions</p>
                <p className="terms-subhead">Terms and Conditions ("Terms")</p>
                <p className="terms-line">Please read these terms and conditions carefully before using our service</p>
                <p className="terms-subhead">Interpretations and Definitions</p>
            
            </div>

            
            <div className="inputTOS">
                <input id="acceptTOS" name="acceptTOS" type="checkbox"  onChange={(e) => handleChange(e.target.checked)} />
                <label className="clicktoAccept" htmlFor="acceptTOS">
                    Click to accept all terms
                </label>
            </div>
        </div>
    );
}