
import { BrowserRouter,Routes,Route,useLocation } from "react-router-dom";

import { useEffect } from "react";

import Start from "./pages/Start"
import SignInGuest from './pages/SigninGuest';
import NoPage from './pages/NoPage';


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



  return (
    <div className="App">
      <BrowserRouter>
      <LocationListener />
        <Routes>
            <Route index element= {<Start/>} />
            <Route path='/start' element= {<Start/>} />
            <Route path='/guestsignin' element = {<SignInGuest />}/>
            <Route path='*' element = {<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
