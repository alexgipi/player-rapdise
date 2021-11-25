import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import HeaderComponent from "../components/HeaderComponent";
import PeliculasComponent from "../components/PeliculasComponent";
import RapdisePlayer from "../components/RapdisePlayer";
import { useParams } from "react-router";


export default function PlayerRouter() {
    const { userNick } = useParams();
  return (

      <div>
        <HeaderComponent userNick={userNick}/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
            <Route exact path="/" element={<RapdisePlayer/>}/>
            
        </Routes>
      </div>
  );
}