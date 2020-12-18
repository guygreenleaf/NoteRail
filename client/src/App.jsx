import React from "react";
import { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { MDBBox } from 'mdbreact';
import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing'

function App() {
  return (
    <div className=""
      style={{
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",        
      }}>
    
    <Router>
    <div> 


    <div style={{display: "flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
    <Landing/>
    </div>


    </div>
    </Router>

    </div>
  );
}

export default App;
