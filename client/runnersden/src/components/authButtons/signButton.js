import { useNavigate } from "react-router-dom"

export default function Button({link,buttonText,handleRequest}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${link}`);
    };

    return(
        <button className="buttons" onClick={handleClick}>{buttonText}</button>
    )
}