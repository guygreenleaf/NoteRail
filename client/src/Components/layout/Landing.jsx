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

export default function Landing() {
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
          <MDBInput
            label="Your email"
            group
            type="email"
            validate
            error="wrong"
            success="right"
          />
          <MDBInput
            label="Your password"
            group
            type="password"
            validate
            containerClass="mb-0"
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
                type="button"
                gradient="blue"
                rounded
                className="btn-block z-depth-1a"
              >
                Sign in
              </MDBBtn>
            </Link>
          </div>
        </MDBCardBody>
        <MDBModalFooter className="mx-5 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">
            Not a member?
            <Link to="/register">
              <a href="#!" className="blue-text ml-1">
                Sign Up
              </a>
            </Link>
          </p>
        </MDBModalFooter>
      </MDBCard>
    </MDBBox>
    </FadeIn>
  );
}
