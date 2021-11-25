import React, { Component } from "react";

import { Routes, Route} from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import LoginComponent from "./components/LoginComponent";
import RapdisePlayer from "./components/RapdisePlayer";
import RegisterComponent from "./components/RegisterComponent";

class Router extends Component {
    render(){
        return (
            <Routes>
              <Route path="/:userNick" element={ <RapdisePlayer />} />
              <Route path="/:userNick/register" element={ <RegisterComponent />} />
              <Route path="/:userNick/login" element={ <LoginComponent />} />
              <Route path="*" element={ <ErrorComponent />} />
              
            </Routes>
            
        )
    }
    
}

// Obtenemos la variable




export default Router;