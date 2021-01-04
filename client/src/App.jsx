import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Link,
  // Redirect,
} from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import Header from "./components/header/Header";
// import Body from "./components/body/Body";
import Landing from "./components/Landing";
import Notes from "./components/notes/Notes";
import Register from "./components/register/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ActivationEmail from "./components/register/ActivationEmail";
import Profile from "./components/profile/Profile";
import SideBar from "./components/header/SideBar";
import { useSelector } from "react-redux";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
    return token;
  }, [token, dispatch]);

  // console.log(auth);
  const { isLogged } = auth;

  return (
    <div className="app">
      {/* Unprotected routes (Note: /reset is only accessible via Authorization token) */}
      <Router>
        <Switch>
          <Route path="/" component={isLogged ? Notes : Landing} exact />
          <Route
            path="/register"
            component={isLogged ? Notes : Register}
            exact
          />
          <Route
            path="/forgotPassword"
            component={isLogged ? Notes : ForgotPassword}
            exact
          />
          <Route path="/user/reset/:token" component={ResetPassword} />
          <Route
            path="/user/activate/:activation_token"
            component={ActivationEmail}
            exact
          />
          <Route path="/notes" component={isLogged ? Notes : Landing} />
          <Route
            path="/profile"
            component={isLogged ? Profile : Landing}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
