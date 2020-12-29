import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Landing from "./components/Landing";
import Notes from "./components/notes/Notes";
import Register from "./components/register/Register";
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import { useSelector } from "react-redux";
import {dispatchLogin} from "./redux/actions/authAction"
function App() {



  return (
    <div className="app">
    {/* Unprotected routes (Note: /reset is only accessible via Authorization token) */}
      <Router>
 
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path ="/forgotPassword" component={ForgotPassword}/>
        <Route exact path = "/user/reset/:token" component={ResetPassword} />
        <Route exact path="/" component={Landing} />
        </Switch>




      <Route exact path="/notes" component={Notes}/>

        {/* Protected routes */}

      </Router>
    </div>
  );
}

export default App;
