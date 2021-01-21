import React, { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import Axios from "axios";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.password2) {
      return setErr("Passwords do not match. Please try again");
    } else {
      try {
        const res = await Axios.post("/user/register", {
          name: user.name,
          email: user.email,
          password: user.password,
        });
        setUser({ name: "", email: "", password: "", password2: "" });
        setErr(res.data.msg);
        window.location.href = "/registerSuccess";
      } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg);
      }
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
        <div
          className="container"
          style={{
            backgroundColor: "white",
            border: "1px black",
            borderRadius: "5px",
          }}
        >
          <div className="row">
            <div className="col s8 offset-s1">
              <div
                className="col s12"
                style={{ paddingLeft: "11.250px", marginTop: "20px" }}
              >
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/">Log in</Link>
                </p>
                <h4 style={{ color: "red", fontSize: "40px" }}>{err}</h4>
              </div>
              <form noValidate onSubmit={registerSubmit}>
                <div className="input-field col s12">
                  <input
                    required
                    onChange={onChange}
                    value={user.name}
                    name="name"
                    id="register-name"
                    type="text"
                  />
                  <label htmlFor="name">Username</label>
                </div>
                <div className="input-field col s12">
                  <input
                    required
                    onChange={onChange}
                    value={user.email}
                    id="email"
                    type="email"
                    name="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    required
                    onChange={onChange}
                    value={user.password}
                    id="password"
                    type="password"
                    name="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12">
                  <input
                    required
                    onChange={onChange}
                    value={user.password2}
                    id="password2"
                    type="password"
                    name="password2"
                  />
                  <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "2px" }}>
                  <button
                    style={{
                      marginBottom: "25px",
                      width: "125px",
                      height: "45px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default Register;
