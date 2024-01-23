import React from "react";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorage";
import Login from "../pages/login/Login";
import { Outlet} from "react-router-dom";

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN);
    return user ? <Login/> : <Outlet/> 
  
   
}

export default RequireUser;


