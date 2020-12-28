import React, { Component, useState } from "react";
import { Link, withRouter, useParams } from "react-router-dom";
import FadeIn from "react-fade-in";
import Axios from "axios";


function ResetPassword() {
    const [user, setUser] = useState({
        password: "",
        password2: ""
      });

      const {token} = useParams();
    
      const [err, setErr] = useState("");
    
      const [isHidden, hiding] = useState(true);

      const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr("");
      };
      const clearState = () => {
        setUser({ password: "", password2: "" });
      };
    
      
      const changeSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.password2) {
          return setErr("Passwords do not match. Please try again");
        } else {
          try {
            const res = await Axios.post("/user/reset",{ 
              password: user.password
            }, {headers: {'Authorization': token}});
            hiding(false);
            setErr(res.data.msg);
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
                      <b>Reset</b> password
                    </h4>
                    <h4 style={{ color: "red" }}>{err}</h4>
                  </div>
                  <form
                    noValidate
                    onSubmit={changeSubmit} /*>onSubmit={this.onSubmit}*/
                  >
                  <Link to="/" style={{marginLeft: '12px'}} hidden={isHidden}> Click here to return to the sign in page</Link>
                    <div className="input-field col s12">
                      <input
                        required
                        onChange={onChange}
                        value={user.password}
                        // error={errors.password}
                        id="password"
                        type="password"
                        name="password"
                        //     className={classnames("", {
                        //     invalid: errors.password
                        //   })}
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12">
                      <input
                        required
                        onChange={onChange}
                        value={user.password2}
                        // error={errors.password2}
                        id="password2"
                        type="password"
                        name="password2"
                        //     className={classnames("", {
                        //     invalid: errors.password2
                        //   })}
                      />
                      <label htmlFor="password2">Confirm Password</label>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "2px" }}>
                      <button
                        style={{
                          marginBottom: "25px",
                          width: "135px",
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
                        Change Password
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

export default ResetPassword
