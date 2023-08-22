
import { Routes,Route,useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Start from "./pages/Start"
import SignInGuest from './pages/SigninGuest';
import NoPage from './pages/NoPage';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Preferences from "./pages/Preferences";

import { Amplify, Auth } from "aws-amplify";
import  awsconfig  from "./aws-exports";

import StartScans from "./pages/StartScans";
import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import LeftFoot from "./pages/LeftFoot";
import RightFoot from "./pages/RightFoot";
import Confirmation from "./pages/Confirmation";
import Shoes from "./pages/Shoes";
import Settings from "./pages/Settings";




// make a show tutorial useState, set to true on SignUps/sign in as guest, false on logins


Amplify.configure(awsconfig);

function LocationListener(){
  const location = useLocation();
  
    useEffect(() => {
        let isStartPage = false;
        let isConfirmPage = false;
        if(location.pathname === "/" || location.pathname === "/Start"){
            isStartPage = true;
        }

        if(location.pathname === "/confirmation/L" || location.pathname === "/confirmation/R"){
          isConfirmPage = true;
        }



        // const isStartPage = location.pathname === '/Start'; // Replace '/start' with the actual path of your start page
        if (isStartPage) {
        document.documentElement.classList.add('start-page');
        document.body.classList.add('start-page');
        }else if(isConfirmPage){
          document.documentElement.classList.add('confirm-page');
          document.body.classList.add('confirm-page');
        } else {
        document.documentElement.classList.remove('start-page');
        document.body.classList.remove('start-page');
        document.documentElement.classList.remove('confirm-page');
        document.body.classList.remove('confirm-page');
        }
    }, [location]);

    return null;
}


function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  
  
  
  const [guestID,setGuestID] = useState(999999999);

  const navigate = useNavigate();
  
  // console.log(user.type);
  
  

  const AssessLoggedInState = async () => {
    await Auth.currentAuthenticatedUser().then(sess => {
      setLoggedIn(true);
      console.log("user is logged in");
    }).catch(() => {
      setLoggedIn(false);
      console.log("user isn't logged in");
    });
  }

  useEffect(() => {
    AssessLoggedInState()
    
    console.log(guestID);
  },[])

  const signOut = async () => {
    try{
     
      await Auth.signOut();
      console.log("Logged user out")
      setLoggedIn(false);
      
    }
    catch(err){
      console.log("error signing out: ",err);
    }
  };

  const onSignIn = async () => {

    setLoggedIn(true);
    const currUserprefs = await assessUserprefs();

    if(currUserprefs){
      if(currUserprefs.size === null || currUserprefs.gender === null){
        navigate("/preferences")
      }
      else{
        navigate("/home");
      }
    }



    
  };



  const onVerify = async (email,pwd) => {
    setLoggedIn(true);
    await Auth.signIn(email,pwd);
    
    console.log("user has signed up!");
    navigate("/overview");
  }

  // sign out current user on Guest sign ins

  function generateUniqueID() {
    // Get the current timestamp in milliseconds
    const timestamp = Date.now();
  
    // Extract the last 9 digits of the timestamp
    const last9Digits = timestamp.toString().slice(-9);
  
    console.log(last9Digits);
  
    return last9Digits;
  }


  const onGuestSignIn = () => {
    setLoggedIn(false);
    const guest = generateUniqueID();
    setGuestID(guest);
    
    navigate("/overview");
  }

  const onPreferencesChange = async (set_preferences) => {
    if (loggedIn) {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const jsonified_preferences = JSON.stringify(set_preferences);
  
        await Auth.updateUserAttributes(user, {
          'custom:preferences': jsonified_preferences
        });
  
        const { attributes } = await Auth.currentAuthenticatedUser();
        console.log('current attributes:', attributes);
  
        
        console.log("user preferences updated successfully");
      } catch (error) {
        console.log("Error updating preferences");
        console.log("Error details:", error.message, error.code);
      }
    } else {
      console.log(set_preferences);
      const prefJson = JSON.stringify(set_preferences);
  
      await localStorage.setItem("preferences",prefJson);
      console.log(JSON.parse(localStorage.getItem("preferences")));
    }
  };
  

  const assessUserprefs = async () => {
      if(loggedIn){
      console.log("Assessing User Prefs");
      const user = await Auth.currentAuthenticatedUser();
      
      if(user){
      
        const { "custom:preferences": updatedPreferences } = user.attributes;

        // Convert the preferences back to an object if needed
        const parsedUpdatedPreferences = JSON.parse(updatedPreferences);

        console.log("User preferences:", parsedUpdatedPreferences);
        return parsedUpdatedPreferences;
      }
    }

    return null;
  }

  return (
    <div className="App">
      
       
        
        <LocationListener />
        <Routes>
              <Route index element= {<Start onStart={signOut}/>} />
              <Route path='/start' element= {<Start onStart={signOut}/>} />
              <Route path='/guestsignin' element = {<SignInGuest onGuestSignIn={onGuestSignIn} />}/>
              <Route path="/login" element = {<Login onSignIn={onSignIn}/>}/>
              <Route path="/signup" element = {<SignUp onVerify={onVerify}/>}/>
              <Route path="/home" element={<Home isLoggedIn={loggedIn} />}/>
              <Route path="/overview" element = {<Overview />}/>
              <Route path="/preferences" element = {<Preferences onPreferenceChange={onPreferencesChange} />} />
              <Route path="/startscans" element={<StartScans isLoggedIn = {loggedIn} />}  />
              <Route path="/instructions/" element={<Instructions />} />
              <Route path="/instructions/:step" element={<Instructions isLoggedIn={loggedIn}/>} />
              <Route path="/leftfoot" element={<LeftFoot isLoggedIn={loggedIn} guestID={guestID}/>} /> 
              <Route path="/rightfoot" element={<RightFoot isLoggedIn={loggedIn} guestID = {guestID}/> }  />
              <Route path="/confirmation/:type" element={<Confirmation />} />
              <Route path="/shoes" element = {<Shoes  isLoggedIn={loggedIn} guestID={guestID} />} /> 
              <Route path="/settings" element = {<Settings onPreferenceChange={onPreferencesChange} />} /> 
              <Route path='*' element = {<NoPage/>} />

              {/* pass isLoggedIn as prop into sub-routes to determine if user is logged in, on the SignInasGuest the sign in button will simply redirect the user to the overview page /}
              {/ No need for private routes */}
          </Routes>
        
      
    </div>
  );
}

export default App;
