
import { BrowserRouter,Routes,Route,useLocation, useNavigate, redirect } from "react-router-dom";

import { useEffect, useState } from "react";

import Start from "./pages/Start"
import SignInGuest from './pages/SigninGuest';
import NoPage from './pages/NoPage';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Preferences from "./pages/Preferences";
import { Account } from "./components/Account";
import Status from "./components/Status";
import { Amplify, Auth } from "aws-amplify";
import  awsconfig  from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";


// make a show tutorial useState, set to true on SignUps/sign in as guest, false on logins


Amplify.configure(awsconfig);

function LocationListener(){
  const location = useLocation();
  
    useEffect(() => {
        let isStartPage = false;

        if(location.pathname === "/" || location.pathname === "/Start"){
            isStartPage = true;
        }



        // const isStartPage = location.pathname === '/Start'; // Replace '/start' with the actual path of your start page
        if (isStartPage) {
        document.documentElement.classList.add('start-page');
        document.body.classList.add('start-page');
        } else {
        document.documentElement.classList.remove('start-page');
        document.body.classList.remove('start-page');
        }
    }, [location]);

    return null;
}


function App() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [preferences,setPref] = useState({"brands":[],"size":null,"gender":null});
  const [user,setUser] = useState({"type":"guest","preferences":preferences});
  
  const navigate = useNavigate();
  
  

  const AssessLoggedInState = () => {
    Auth.currentAuthenticatedUser().then(sess => {
      setLoggedIn(true);
      console.log("user is logged in");
    }).catch(() => {
      setLoggedIn(false);
      console.log("user isn't logged in");
    });
  }

  useEffect(() => {
    AssessLoggedInState()
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

  const onSignIn = () => {
    setLoggedIn(true);
    navigate("/home");
  };



  const onVerify = async (email,pwd) => {
    setLoggedIn(true);
    // await Auth.signIn(email,pwd);
    // setUser(Auth.currentAuthenticatedUser);
    navigate("/overview");
  }

  // sign out current user on Guest sign ins

  const onGuestSignIn = () => {
    setLoggedIn(false);
    navigate("/overview");
  }

  const onPreferencesChange = async () => {
    if(loggedIn){
      try{
        const user = await Auth.currentAuthenticatedUser();
        const { attributes } = user;

        const updatedAttributes = {
          ...attributes,
          preferences: JSON.stringify(preferences) //convert preferences object
        };

        await Auth.updateUserAttributes(user,updatedAttributes);
        console.log("user preferences updated successfully");
      }catch (error){
        console.log("Error updating preferences");
      }
    }else{
      localStorage.setItem('guestPreferences', JSON.stringify(preferences));
    }
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
              <Route path="/overview" element = {<Overview />}/>
              <Route path="/preferences" element = {<Preferences  />} />
              <Route path='*' element = {<NoPage/>} />
              
              {/* pass isLoggedIn as prop into sub-routes to determine if user is logged in, on the SignInasGuest the sign in button will simply redirect the user to the overview page */}
              {/* No need for private routes */}
          </Routes>
        
      
    </div>
  );
}

export default App;
