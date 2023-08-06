import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faCartShopping, faFilter, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

// const {google} = require("googleapis");



function Shoes({guestID,guestPreferences,isLoggedIn}) {

    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    const [ascending,setAscending] = useState("ascending")
    const [ascendingButton,setAscendingButton] = useState(<FontAwesomeIcon className='ascending-button' icon={faSortUp} />);
    const [shoeRecs,setShoeRecs] = useState([]);



    
    function DropDownRow({brand,model,shoeSize,shoeBuyLink,shoeImageLink}){

        return(
            <div className='shoe-container'>
                <div className='image-model-container'>
                    <div className='text-backdrop'>
                        <p>{shoeSize}</p>
                    </div>

                    <img src={shoeImageLink} alt='img.jpg' />

                    <p>{brand} | {model}</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                </div>
            </div>   
        );

    }

    async function DropDown({shoeList}){
        const userInputID = null;

        if(isLoggedIn){
            try {
                const user = await Auth.currentAuthenticatedUser();
                const { "custom:preferences": userPrefs } = user.attributes;
                const userPrefObj = JSON.parse(userPrefs);
                input_size: parseFloat(userPrefObj["size"])
                

            } catch (error) {
                console.log(error);
            }
        }

        const dropDownRows = [];

            for (const arr in shoeList){
                dropDownRows.push(<dropDownRow brand = {arr[0]} model={arr[1]} shoeSize = {isLoggedIn ? userInputID : parseFloat(guestPreferences["size"])} shoeBuyLink = {arr[2]} shoeImageLink = {arr[3]} />)
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



    

    useEffect(() => {
        const getShoes = async () => {
        
            await Auth.currentAuthenticatedUser().then(async (user) => {
                try {
    
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
        
                    // console.log(data.shoes["Shoe Model Recommendations"]);
                    
                    // return data.shoes["Shoe Model Recommendations"];
                    setShoeRecs(data);
                    // console.log(data);
            
                    
                } catch (error) {
                    console.log(error);
                }
              }).catch(async () => {
                console.log(guestPreferences);
    
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
    
                // console.log(data.shoes["Shoe Model Recommendations"]);
                
                // return data.shoes["Shoe Model Recommendations"];
                setShoeRecs(data);
                // console.log(data);
                
              });
    
      
        }

        getShoes();
        
    },[]);


    useEffect(() => {

        
        console.log(shoeRecs);
    }, [shoeRecs]);

    return (
        <div className="separate-content">
            <div className="content">
                <div className='searchContent'>
                    <div className='searchbar'> {ascending} <button className='toggle-button' onClick={() => handleSort()}>{ascendingButton}</button></div>
                    <div className='searchbar'>Filter by Brand </div>
                </div>

                
                <div className='shoes'>
                    {shoeRecs.length > 0 ? <DropDown shoeList={shoeRecs} /> : <p>Loading...</p>}
                </div>
            </div>

            <Navbar location={"home"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
    )
}

export default Shoes