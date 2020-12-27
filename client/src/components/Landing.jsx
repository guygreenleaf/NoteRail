import React, { Component, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MDBCard, MDBCardBody, MDBFooter, MDBBox} from "mdbreact";
import FadeIn from "react-fade-in";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Register from './register/Register'
import ForgotPassword from './ForgotPassword'

function Landing() {
 
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [err, setErr] = useState('')
  // const { email, password, err, success } = user;

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('')
  };

  const [modal, setModal] = useState(false);

  const modalClick = e => {
    setModal(true);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await Axios.post("/user/login", { email, password });
  //     setUser({ ...user, err: "", success: res.data.msg });
  //   } catch (err) {
  //     err.response.data.msg &&
  //       setUser({ ...user, err: err.response.data.msg, success: "" });
  //   }
  // };

  const handleSubmit = async (e) => {

    e.preventDefault();

      try {
        const res = await Axios.post("/user/login", {
          email: user.email,
          password: user.password,
        });
        setUser({email: "", password: "" });
        setErr(res.data.msg);
      } catch (err) {
        err.response.data.msg && setErr(<FadeIn transitionDuration="1100">{err.response.data.msg}</FadeIn>);
      }
    };

  return (
  
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <FadeIn transitionDuration="1100">
        <MDBBox display="flex" justifyContent="center">
          <MDBCard>
            <MDBCardBody className="mx-3">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Welcome to NoteRail!</strong>
                </h3>
                <h4 style={{color:'black'}}>{err}</h4>
              </div>
              <form onSubmit = {handleSubmit} >
                <div className="input-field col s12">
                  <input
                    type="email"
                    name="email"
                    id="login-email"
                    required
                    value={user.email}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    name="password"
                    id="login-password"
                    required
                    value={user.password}
                    autoComplete="true"
                    onChange={onChangeInput}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text"></span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "107px",
                      height: "45px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Login
                  </button>
                  <div>
                    <p className="font-small grey-text">
                      Forgot your password?
                      <Link to="/forgotPassword" className="font-small">
                        Click Here
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </MDBCardBody>
            <MDBFooter className="mx-5 pt-3 mb-1 bg-white">
              <p
                className="font-small grey-text"
                style={{ marginRight: "30px" }}
              >
                Not a member?
                <Link to="/register" className="blue-text ml-1">
                  Sign Up
                </Link>

              </p>
            </MDBFooter>
          </MDBCard>
        </MDBBox>
      </FadeIn>
    </div>

  );
}

export default Landing;
