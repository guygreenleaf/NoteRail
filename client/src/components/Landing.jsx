import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBModalFooter, MDBBox } from "mdbreact";
import FadeIn from "react-fade-in";

class Landing extends Component {
  
  render() {
    return (
      <FadeIn transitionDuration="1100">
        <MDBBox display="flex" justifyContent="center">
          <MDBCard>
            <MDBCardBody className="mx-3">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Welcome to NoteRail!</strong>
                </h3>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">
                  </span>
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
                </div>
              </form>
            </MDBCardBody>
            <MDBModalFooter className="mx-5 pt-3 mb-1">
              <p
                className="font-small grey-text"
                style={{ marginRight: "30px" }}
              >
                Not a member?
                <Link to="/register" className="blue-text ml-1">
                  Sign Up
                </Link>
              </p>
            </MDBModalFooter>
          </MDBCard>
        </MDBBox>
      </FadeIn>
    );
  }
}

export default Landing;
