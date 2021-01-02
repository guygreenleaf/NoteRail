import React, { useState, useEffect } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import axios from "axios";
import FadeIn from "react-fade-in";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  console.log(activation_token);
  return (
    <div className="active_page">
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
                  style={{
                    paddingLeft: "11.250px",
                    marginTop: "20px",
                    marginLeft: "45px",
                    marginRight: "45px",
                  }}
                >
                  <h4>
                    <b>Congrats!</b> Your account has been activated. You can
                    now sign in using the credentials you provided at
                    registration.
                  </h4>
                  <p className="grey-text text-darken-1"></p>
                </div>

                <div className="col s12" style={{ paddingLeft: "2px" }}>
                  <Link to="/">
                    <button
                      style={{
                        marginBottom: "25px",
                        width: "125px",
                        height: "45px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        marginLeft: "55px",
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        color: "white",
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable accent-3"
                    >
                      Sign in
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default ActivationEmail;
