import { useNavigate } from "react-router-dom"

export default function Button({classname,link,buttonText}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${link}`);
    };

    return(
        <button className={classname} onClick={handleClick}>{buttonText}</button>
    )
}