import React from "react";
import { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import { MDBBox } from 'mdbreact';
// import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing'
import Register from './Components/layout/Auth/Register'

function App() {
  return (
    <Router>
    <div className=""
      style={{
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",        
      }}>
    

    <div> 


    <div style={{display: "flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
    <Route exact path="/" component={Landing}/>
    <Route exact path="/register" component={Register}/>
    </div>

    </div>


    </div>
    </Router>
  );
}

export default App;
