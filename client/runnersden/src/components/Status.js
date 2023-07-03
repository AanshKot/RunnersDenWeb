import { useContext, useState, useEffect } from "react";
import { AccountContext } from "./Account";

const Status = () => {
    const [status,setStatus] = useState(false);

    const { getSession, logout } = useContext(AccountContext);


    useEffect(() => {
        getSession().then((session) => {
            console.log("Session: ", session);
            setStatus(true);
        }).catch((error) => {
            console.error("Error in getSession:", error);
            setStatus(false);
          });
    },[])

    return <div>{status ? <button onClick={logout}> Logout</button> : null}</div>;
};

export default Status;