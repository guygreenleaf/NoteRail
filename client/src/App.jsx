import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// import { MDBBox } from 'mdbreact';
// import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing'
import Register from './Components/layout/Auth/Register'
import PrivateRoute from "./Components/private-routes/PrivateRoute";
import Dashboard from "./Components/layout/dashboard/Dashboard";
import RegisterSuccess from "./Components/layout/Auth/RegisterSuccess"
import { Provider } from "react-redux";
import store from "./store";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className=""
      style={{
        backgroundRepeat: "no-repeat",
        WebkitBackgroundSize: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",        
      }}>
    




    <div style={{display: "flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
    <Route exact path="/" component={Landing}/>
    <Route exact path="/register" component={Register}/>
    <Route exact path="/registerSuccess" component={RegisterSuccess}/>
    <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
    </Switch>

    
    
    </div>



    </div>
    </Router>
    </Provider>
  );
}

export default App;
