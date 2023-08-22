import React, { useEffect, useState } from 'react'
import MobilityButtons from '../components/MobilityButtons';
import Nike from "../static/images/nike.png";
import Adidas from '../static/images/adidas.png';
import Asics from "../static/images/asics.png";
import Hoka from "../static/images/hoka.png"
import NewBalance from "../static/images/newbalance.png"
import Brooks from "../static/images/brooks.png";
import Saucony from "../static/images/saucony.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function Brand({brand,onBrandClick,selected,logo}){

    return(
        <button type="button" className={selected ? "selected-brand":"unselected-brand"} onClick={onBrandClick}>{brand} <img className='brand-logo' src={logo} alt='brand-logo'/></button>
    )
}

function BrandBoard({selected_brands,setSelectedBrands,userBrandPrefs,setUserBrandPrefs}){
    
    const handleClick = (index, brandName) => {
        const updatedSelection = [...selected_brands];
        updatedSelection[index] = !selected_brands[index];
        setSelectedBrands(updatedSelection);
    
        const updatedPrefs = [...userBrandPrefs];
        if (selected_brands[index]) {
          // Remove brand from preferences if it was selected before
          const brandIndex = updatedPrefs.findIndex((brand) => brand === brandName);
          if (brandIndex !== -1) {
            updatedPrefs.splice(brandIndex, 1);
          }
        } else {
          // Add brand to preferences if it was not selected before
          updatedPrefs.push(brandName);
        }
        setUserBrandPrefs(updatedPrefs);
      };


    return (
        <div className='board'>
            <div className='board-row'>
                <Brand brand={"Adidas"} onBrandClick={() => handleClick(0,"adidas")} selected={selected_brands[0]}  logo={Adidas}/>
                <Brand brand={"Hoka"} onBrandClick={() => handleClick(1,"hoka")} selected={selected_brands[1]} logo={Hoka}/>
                <Brand brand={"Asics"} onBrandClick={() => handleClick(2,"asics")} selected={selected_brands[2]} logo={Asics}/>
            </div>

            <div className='board-row'>
                <Brand brand={"Nike"} onBrandClick={() => handleClick(3,"nike")} selected={selected_brands[3]} logo={Nike}/>
                <Brand brand={"Saucony"} onBrandClick={() => handleClick(4,"saucony")} selected={selected_brands[4]} logo={Saucony}/>
                <Brand brand={"Brooks"} onBrandClick={() => handleClick(5,"brooks")} selected={selected_brands[5]} logo={Brooks}/>
            </div>

            <div className='board-row'>
                <Brand brand={"New Balance"} onBrandClick={() => handleClick(6,"newBalance")} selected={selected_brands[6]} logo={NewBalance}/>
            </div>
        </div>
    )


}


function DropDownRow({ size, onClick }) {
  return (
    <div className='dropdownRow'>
      <button type='button' onClick={onClick}  className='dropdownRowButton'>
        {size}
      </button>
    </div>
  );
}

function SizeDropDown({ handleClick }) {
  const dropDownRows = [];

  for (let i = 3.5; i < 14.5; i += 0.5) {
    dropDownRows.push(<DropDownRow size={i} onClick={() => handleClick(i)} />);
  }

  return <div className='dropdown'>{dropDownRows}</div>;
}

function GenderDropDown({ handleClick }) {
  const dropDownRows = [];
  dropDownRows.push(
    <DropDownRow size={"Men's"} onClick={() => handleClick("Men's")} />
  );
  dropDownRows.push(
    <DropDownRow size={"Women's"} onClick={() => handleClick("Women's")} />
  );

  return <div className='dropdown'>{dropDownRows}</div>;
}


function Settings({onPreferenceChange,isLoggedIn}) {
    


    const [selectedBrands, setSelectedBrands] = useState([]);
    const [userBrandPrefs, setUserBrandPrefs] = useState([]);
    const [size, setSize] = useState(null);
    const [gender, setGender] = useState(null);

    const [sizeDropDown,setSizeDropdown] = useState(false);
    const [genderDropDown,setGenderDropdown] = useState(false);

    const [sizeButtonText,setSizeButtonText] = useState("Choose a size");
    const [genderButtonText,setGenderButtonText] = useState("Men's/Women's");

    const updateStates = (parsedUpdatedPreferences) => {
        const initialSelectedBrands = ["adidas", "hoka", "asics", "nike", "saucony", "brooks", "newBalance"].map(
            (brand) => parsedUpdatedPreferences.brands.includes(brand)
        );
        setSelectedBrands(initialSelectedBrands);
        console.log(parsedUpdatedPreferences);
        setUserBrandPrefs(parsedUpdatedPreferences.brands);
        setSize(parsedUpdatedPreferences.size);
        setSizeButtonText(parsedUpdatedPreferences.size);
        setGender(parsedUpdatedPreferences.gender);
        setGenderButtonText(parsedUpdatedPreferences.gender);

    };

    useEffect(() => {
        const getUserPref = async () => {
            if(isLoggedIn){
            
                const user = await Auth.currentAuthenticatedUser(); 
    
                const { "custom:preferences": updatedPreferences } = user.attributes;
    
        // Convert the preferences back to an object if needed
                const parsedUpdatedPreferences = JSON.parse(updatedPreferences);
    
                console.log("User preferences:", parsedUpdatedPreferences);
                
               
    
                updateStates(parsedUpdatedPreferences);
            }
    
            else{
            
                const JSON_preferences = JSON.parse(localStorage.getItem("preferences"));
    
               
                updateStates(JSON_preferences);
            }
        }
        
        getUserPref();

    },[]);


    const navigate = useNavigate();

    const toggleSizeDropDown =  () =>{
        setSizeDropdown(!sizeDropDown);
    };

    const toggleGenderDropDown =  () =>{
        setGenderDropdown(!genderDropDown);
    };

    const handleSizeSelect = (selected_size) => {
        setSize(selected_size);
        toggleSizeDropDown();
        setSizeButtonText(selected_size);
        
    }

    const handleGenderSelect = (selected_gender) => {
        setGender(selected_gender);
        toggleGenderDropDown();
        setGenderButtonText(selected_gender);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const preferences = {"brands":userBrandPrefs,"size":size,"gender":gender};
        await onPreferenceChange(preferences);
        navigate("/startscans");
    }

    return (
    <div className="content preferences">
      
     
    <div className="titleContainer">
      <MobilityButtons renderNext={false} backLink={"home"} nextLink={""} />
      <div className="header">
        <h1 className="freeGuest larger-header">Help Us Find your Perfect Shoe Fit...</h1>
      </div>
    </div>
    

    <p className='sub-title'>What are your favorite shoes?</p>
    
    <form className='preferences-form' onSubmit={onSubmit}>
        <div className='brands-selection'>
            <p className='sub-heading'>Choose your favorite brands</p>

            <BrandBoard selected_brands={selectedBrands} setSelectedBrands={setSelectedBrands} userBrandPrefs={userBrandPrefs} setUserBrandPrefs={setUserBrandPrefs} /> 

        </div>

        <div className='remaining-preferences'>
            
            <div className='total-dropdown'>
                <button type='button' onClick={toggleSizeDropDown} className='preference-dropdown-button'><span className={sizeButtonText === "Choose a size" ? "unselected-dropdown" : "selected-dropdown"}>{sizeButtonText}</span> <FontAwesomeIcon icon={faChevronDown} /></button>

                { sizeDropDown && (   
                    <SizeDropDown  handleClick = {handleSizeSelect}/>
                )
                }
            </div>

            <div className='total-dropdown'>
                <button type='button' onClick={toggleGenderDropDown} className='preference-dropdown-button'><span className={genderButtonText === "Men's/Women's" ? "unselected-dropdown" : "selected-dropdown"}>{genderButtonText}</span> <FontAwesomeIcon icon={faChevronDown} /></button>

                { genderDropDown && (   
                    <GenderDropDown handleClick={handleGenderSelect} />
                )
                }
            </div>
        </div>

        {userBrandPrefs.length !== 0 && size && gender && (<button type='submit' className='submit-button'>Continue</button>)}
    </form>
  </div>
  );
}

export default Settings