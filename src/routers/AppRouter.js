import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import PlayerRouter from "./PlayerRouter";

export default function AppRouter() {
  return (

      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
            <Route exact path="/:userNick/login" element={<LoginComponent/>}/>
            <Route exact path="/:userNick/register" element={<RegisterComponent/>}/>            
            <Route path="/:userNick/*" element={<PlayerRouter/>}/>
            <Route exact path="/" element={<ErrorComponent/>}/>
        </Routes>
      </div>
  );
}