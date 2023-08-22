import { useNavigate } from "react-router-dom"





function Back({backlink,clickHandler}){
    return(
        <div className="back"> <button onClick={() => clickHandler(backlink)} className="mobButton"><p className="mobButtons"> &lt;Back </p></button> </div>
    )
}

function Next({nextLink,clickHandler}){
    return(
        <div className="next"><button onClick={() => clickHandler(nextLink)} className="mobButton"><p className="mobButtons">Next &gt;</p></button></div>
    )
}
export default function MobilityButton({renderNext,backLink,nextLink}){
    let navigate = useNavigate();

    const handleClick = (link) => {
    
        navigate(`/${link}`);
    };


    return(
        <div className="mobilityButtons">
                <Back backlink={backLink} clickHandler={handleClick}/>
                {renderNext ? <Next  nextLink={nextLink} clickHandler={handleClick}/> : null}
        </div>
    )
}