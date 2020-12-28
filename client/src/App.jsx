import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

import Header from "./components/header/Header";
import Body from "./components/body/Body";
import Landing from "./components/Landing";
import Notes from "./components/notes/Notes";
import Register from "./components/register/Register";
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="app">
      <Router>
        <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path ="/forgotPassword" component={ForgotPassword}/>
        <Route exact path = "/user/reset/:token" component={ResetPassword} />
        <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
