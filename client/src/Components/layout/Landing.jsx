import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
  MDBBox,
} from "mdbreact";
import FadeIn from 'react-fade-in';


// export default function Landing() {

//   const [inputs, setInputs] = useState({
//     email:'',
//     password:''
//   })

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
console.log(userData);
  };
render() {
    const { errors } = this.state;
  return (
    <FadeIn transitionDuration='1100'>
    <MDBBox
      display="flex"
      justifyContent="center"
    >
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
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "107px",
                    height:"45px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color:'white'
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          {/* <MDBInput
            label="Your email"
            group
            type="email"
            validate
            error="wrong"
            success="right"
            value={this.state.email}
            onChange={this.onChange}
          />
          <MDBInput
            label="Your password"
            group
            type="password"
            validate
            containerClass="mb-0"
            value={this.state.password}
            onChange={this.onChange}
          />
          <p className="font-small blue-text d-flex justify-content-end pb-3">
            Forgot
            <a href="#!" className="blue-text ml-1">
              Password?
            </a>
          </p>
          <div className="text-center mb-3">
            <Link to="/login">
              <MDBBtn
                type="submit"
                gradient="blue"
                rounded
                className="btn-block z-depth-1a"
              >
                Sign in
              </MDBBtn>
            </Link>
          </div> */}
        </MDBCardBody>
        <MDBModalFooter className="mx-5 pt-3 mb-1">
          <p className="font-small grey-text" style={{marginRight:'30px'}}>
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