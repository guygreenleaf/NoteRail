import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Landing from "./components/Landing";
import Notes from "./components/notes/Notes";
import Register from "./components/register/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ActivationEmail from "./components/register/ActivationEmail";
import Profile from "./components/profile/Profile";
import PublicNotes from "./components/notes/PublicNotes";
import EditNote from "./components/notes/EditNote";
import DeleteNote from "./components/notes/DeleteNote";
import EditContent from "./components/notes/EditContent";
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
          <Route
            path="/public"
            component={isLogged ? PublicNotes : Landing}
            exact
          />
          <Route path="/:id" component={isLogged ? EditNote : Landing} exact />
          <Route
            path="/delNote/:id"
            component={isLogged ? DeleteNote : Landing}
            exact
          />
          <Route
            path="/editContent/:id"
            component={isLogged ? EditContent : Landing}
            exact
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
