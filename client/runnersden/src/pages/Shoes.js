import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faCartShopping, faFilter, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import RetakePhoto from '../components/shoesComponents/RetakePhoto';
import Loading from '../components/shoesComponents/Loading';
import FilterDropdown from '../components/shoesComponents/FilterDropdown';
import Colorway from '../components/shoesComponents/Colorway';



// const {google} = require("googleapis");



function Shoes({guestID,isLoggedIn}) {

    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    }

    const [ascending,setAscending] = useState("ascending")
    const [ascendingButton,setAscendingButton] = useState(<FontAwesomeIcon className='ascending-button' icon={faSortUp} />);
    const [shoeRecs,setShoeRecs] = useState([]);
    const [renderErrMsg,setRenderErrMsg] = useState(false);
    const [errMsgContent,setErrMsgContent] = useState("");
    const [searchText,setSearchText] = useState("");
    const [filteredShoeRecs, setFilteredShoeRecs] = useState([]);
    const [unfilteredBrands,setUnfilteredBrands] = useState({"Adidas ": true,
    "Brooks": true,
    "Nike": true,
    "Hoka": true,
    "NewBalance": true,
    "Asics": true,
    "Saucony": true});
    const [renderFilterDropDown,setRenderFilterDropdown] = useState(false);



    function handleSearchChange(searchText){
        setSearchText(searchText);
    }

    function toggleFilterDropDown(){
        setRenderFilterDropdown(!renderFilterDropDown);
        
    }
    
    // only dropdownrow is rerendering, not the dropdown itself, fix this issue tom morning
    function DropDownRow({brand,model,shoeSize,shoeBuyLink,shoeImageLink,colorway,handleColorSelection,selectedColor}){
        const model_withoutUnderscore = model.replace(/_/g,' ');


        return(
            
            <div className='shoe-container'>
                {/* {console.log("DropDown is rendering")} */}

                
                    <div className='image-model-container'>
                        <div className='text-backdrop'>
                            {shoeSize}
                        </div>

                        <img className='shoe-img' src={shoeImageLink} alt='img.png' />

                        <p className='shoe-desc'>{brand} | {model_withoutUnderscore}</p>
                    </div>



                    <div className='shoeAttributes' >
                        <Colorway colorsHash={colorway} model={model} handleClick={handleColorSelection} selectedColor={selectedColor} />
                        <a href={shoeBuyLink}><FontAwesomeIcon icon={faCartShopping} /></a>
                    </div>
            </div>
           
        );

    }

    function DropDown({shoeList,isAscending,unfilterBrands}){
            
            let sortedShoeList = [...shoeList];


            if(isAscending === "ascending"){
                sortedShoeList.sort((a,b) => a[1] - b[1]);
            }else {
                sortedShoeList.sort((a, b) => b[1] - a[1]);
            }
            
            shoeList = [...sortedShoeList];
            
            const filteredShoeList = sortedShoeList.filter((shoeAndSize) => {
                const brand = shoeAndSize[0][0];
                return unfilteredBrands[brand]; // Check if the brand is in the unfilteredBrands hashmap
            });

            const handleColorClick = (model, shoeImageLink,color) => {
                // Find the index of the matching model in the state
                const rowIndex = dropdownRows.findIndex((row) => row.props.model === model);
                
                const dropDownRowProps = dropdownRows[rowIndex].props;
              
                
                const newDropDownRow = <DropDownRow brand={dropDownRowProps.brand} model={model} shoeSize={dropDownRowProps.shoeSize} shoeBuyLink={dropDownRowProps.shoeBuyLink} shoeImageLink={shoeImageLink} colorway={dropDownRowProps.colorway} handleColorSelection={handleColorClick} selectedColor = {color} />

                if (rowIndex !== -1) {
                  // Create a copy of the dropdownRows array
                  const newDropdownRows = [...dropdownRows];
                  // Update the shoeImageLink for the matching model
                  newDropdownRows[rowIndex] = newDropDownRow
                  // Update the state with the modified array
                  setDropDownRows(newDropdownRows);
                }
              };

            const initialDropDownRows = filteredShoeList.map((shoeAndSize, index) => (
                <DropDownRow
                    key={index}
                    brand={shoeAndSize[0][0]}
                    model={shoeAndSize[0][1]}
                    shoeSize={shoeAndSize[1]}
                    shoeBuyLink={shoeAndSize[0][2]}
                    shoeImageLink={shoeAndSize[0][3]}
                    colorway={shoeAndSize[0][4]}
                    handleColorSelection={handleColorClick}
                />
            ))
            
            const [dropdownRows,setDropDownRows] = useState(initialDropDownRows);


            


            return(
                <div className='dropDown'>
                    {dropdownRows}
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
                    
                      try {
                        const response = await fetch(`http://localhost:5050/shoes`, requestOptions);
                        
                        
                        
                        
                        if(!response.ok){
                            const errorData = await response.json();
                            throw new Error(errorData.error);
                        }
    
                        // console.log(data.shoes["Shoe Model Recommendations"]);
                        
                        // return data.shoes["Shoe Model Recommendations"];
                        else{
                            const data = await response.json();
                            setShoeRecs(data.sendClientRecs);
                         }
                        // console.log(data);
                    } catch (error) {
                        console.log(error);
                        setRenderErrMsg(true);
                        setErrMsgContent(error.message);
                    }

            
                    
                } catch (error) {
                    console.log(error);
                }
              }).catch(async () => {
                const guestPreferences = JSON.parse(localStorage.getItem("preferences"));
    
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
    
                try {
                    const response = await fetch(`http://localhost:5050/shoes`, requestOptions);
                    
                    
                    
                    
                    if(!response.ok){
                        const errorData = await response.json();
                        throw new Error(errorData.error);
                    }

                    // console.log(data.shoes["Shoe Model Recommendations"]);
                    
                    // return data.shoes["Shoe Model Recommendations"];
                    else{
                        const data = await response.json();
                        // console.log(data.sendClientRecs);
                        setShoeRecs(data.sendClientRecs);
                     }
                    // console.log(data);
                } catch (error) {
                    console.log(error);
                    setRenderErrMsg(true);
                    setErrMsgContent(error.message);
                }
                
              });
    
      
        }

        getShoes();
        
    },[]);


    useEffect(() => {
        // Filter shoeRecs based on search text
        const filteredShoeRecs = shoeRecs.filter((shoeAndSize) =>
            shoeAndSize[0][1]
                .toLowerCase()
                .replace(/_/g, '')
                .startsWith(searchText.toLowerCase().replace(/_/g, ''))
        );

        // Update the filtered shoeRecs in state
        setFilteredShoeRecs(filteredShoeRecs);
    }, [searchText, shoeRecs]);



    return (
        <div className="separate-content">
            <div className="shoe-content" style={{width : ""}}>
                <div className='searchContent'>
                    <div className='searchbar'> <p className='searchDesc' style={{ width:"100%", margin:"0"}}>{ascending} <button className='toggle-button' onClick={() => handleSort()}>{ascendingButton}</button></p></div>
                    <div className='searchbar'><p onClick={toggleFilterDropDown} className='searchDesc' style={{ width:"100%", margin:"0"}}>Filter by Brand</p></div>
                    {renderFilterDropDown && (<FilterDropdown unfilteredBrands={unfilteredBrands} setUnfilteredBrands={setUnfilteredBrands} />)}

                    <div className='searchbar'><input
                        className='searchDesc'
                        placeholder='Search for shoes...'
                        value={searchText}
                        type='text'
                        onChange={(e) => handleSearchChange(e.target.value)}
                        style={{width:"100%",textAlign:"center",borderRadius:"15px",background:"#17DB4E",color:"#fff"}}
                    /></div>
                </div>

                { renderErrMsg && (<RetakePhoto errMsgContent = {errMsgContent} />)}
                
                <div className='shoes'>
                    {filteredShoeRecs.length > 0 ? <DropDown shoeList={filteredShoeRecs} isAscending={ascending} unfilterBrands={unfilteredBrands}/> : <Loading />}
                </div>
            </div>

            <Navbar location={"home"} isLoggedIn={isLoggedIn} handleClick={handleClick}/>
        </div>
    )
}

export default Shoes