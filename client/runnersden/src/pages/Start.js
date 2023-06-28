import logo from "../static/images/runnersDenLogoNoBG.png"
import Button from "../components/Button";


export default function StartPage(){

    return(
        <div className="start">
            <img className="runnersDenLogo" src={logo} alt="logo"/>

            <div className="title-container"> 
                <h1 className="title">Shoe Size Finder</h1>
                <h2 className="sub-title">Powered by UniversoleFit</h2>
            </div>

            <div className="button-containers">
                <Button link={"signup"} buttonText={"Create Account"}/>
                <Button link={"login"} buttonText={"Sign In"} />
                <Button link={"guestsignin"} buttonText={"Continue as Guest"} /> 
            </div>
        </div>
    );
}