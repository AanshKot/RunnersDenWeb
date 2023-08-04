import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// const {google} = require("googleapis");



function Shoes({guestID,guestPreferences,isLoggedIn}) {

    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    const [ascending,setAscending] = useState("ascending")
    const [ascendingButton,setAscendingButton] = useState(<FontAwesomeIcon className='ascending-button' icon={faSortUp} />);
    const [shoeRecMap,setShoeRecMap] = useState({});


    
    function dropDownRow({shoe,shoeSize}){
        // query google sheets

        

        // const auth = new google.auth.GoogleAuth({

        

        // });


    }

    function dropDown({shoeList}){


        const dropDownRows = [];

        for (const key in shoeList){
            dropDownRows.push(<dropDownRow shoe = {key} shoeSize = {shoeList[key]}  />)
        }

        return(
            <div className='dropDown'>
                {dropDownRows}
            </div>
        );

    }



    const handleSort = () => {
        

        if( ascending === "ascending" ){
            setAscending("descending");
            setAscendingButton(<FontAwesomeIcon className='ascending-button' icon={faSortDown} />);
        }

        else{
            setAscending('ascending');
            setAscendingButton(<FontAwesomeIcon className='ascending-button' icon={faSortUp} />);
        }

    }

    const getShoes = async () => {
        const user =  await Auth.currentAuthenticatedUser();

        if(user){
            const { "custom:id" : id } = user.attributes;
            const { "custom:preferences": userPrefs } = user.attributes;
            const { "custom:imageL" : leftLink  } = user.attributes;
            const { "custom:imageR" : rightLink  } = user.attributes;

            const userPrefObj = JSON.parse(userPrefs);


           

            const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userID: parseInt(id),
                  imageL: leftLink,
                  imageR: rightLink,
                  paperSize: localStorage.getItem("paperSize"),
                  input_size: parseFloat(userPrefObj["size"]),
                  sex: userPrefObj["gender"]

                }),
              };

            const response = await fetch(`http://localhost:5050/shoes`, requestOptions);

            const data = await response.json();

            console.log(data.shoes["Shoe Model Recommendations"]);
            
            return data.shoes["Shoe Model Recommendations"];
            
        }

        else{
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    userID: parseInt(guestID),
                    imageL: sessionStorage.getItem("imageL"),
                    imageR: sessionStorage.getItem("imageR"),
                    paperSize: localStorage.getItem("paperSize"),
                    input_size: parseFloat(guestPreferences["size"]),
                    sex: guestPreferences["gender"],
                }),
            };

            const response = await fetch(`http://localhost:5050/shoes`, requestOptions);

            const data = await response.json();

            console.log(data.shoes["Shoe Model Recommendations"]);
            
            return data.shoes["Shoe Model Recommendations"];
           
        }
    }

    

    useEffect(() => {
        const shoeRec = getShoes();
        setShoeRecMap(shoeRec);
    },[]);

    return (
        <div className="separate-content">
            <div className="content">
                <div className='searchContent'>
                    <div className='searchbar'> {ascending} <button className='toggle-button' onClick={() => handleSort()}>{ascendingButton}</button></div>
                    <div className='searchbar'>Filter by Brand </div>
                </div>


                <div className='shoes'>

                </div>
            </div>

            <Navbar location={"home"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
    )
}

export default Shoes