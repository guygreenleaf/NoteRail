import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
function RegisterSuccess() {
  return (
    <div>
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
                      // marginLeft: "45px",
                      marginRight: "45px",
                    }}
                  >
                    <h4
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        overflowWrap: "break-word",
                      }}
                    >
                      <b>Congrats!</b> You've successfully registered. Before
                      you sign in, you must confirm your email. Please check
                      your email for a link from us on how to do this.
                    </h4>
                  </div>

                  <div className="col s12" style={{ paddingLeft: "2px" }}>
                    <Link to="/">
                      <button
                        style={{
                          marginBottom: "25px",
                          width: "150px",
                          height: "50px",
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
                        Return to Login
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export default RegisterSuccess;
