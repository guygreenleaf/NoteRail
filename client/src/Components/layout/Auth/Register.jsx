import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBBox,
} from "mdbreact";
import FadeIn from "react-fade-in";

export default function Register() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });
  return (
    <div>
      <FadeIn transitionDuration="1100">
        <MDBBox display="flex" justifyContent="center">
          <MDBCard>
            <Link to="/">
              <MDBIcon icon="angle-double-left" size="2x" />
            </Link>
            <MDBCardBody className="mx-3">
              <MDBInput
                label="Username"
                group
                validate
                error="wrong"
                success="right"
                value={inputs.username}
                onChange={(e) => setInputs(e.target.value)}
              />
              <MDBInput
                label="Email"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                value={inputs.email}
                onChange={(e) => setInputs(e.target.value)}
              />
              <MDBInput
                label="Password"
                group
                type="password"
                validate
                containerClass="mb-0"
                value={inputs.password}
                onChange={(e) => setInputs(e.target.value)}
              />
              <MDBInput
                label="Confirm Password"
                group
                type="password"
                validate
                containerClass="mb-0"
                value={inputs.password2}
                onChange={(e) => setInputs(e.target.value)}
              />
              <div className="text-center mb-3">
                <Link to="/login">
                  <MDBBtn
                    type="submit"
                    gradient="blue"
                    rounded
                    className="btn-block z-depth-1a"
                  >
                    Sign up
                  </MDBBtn>
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBBox>
      </FadeIn>
    </div>
  );
}
