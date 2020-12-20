import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FadeIn from "react-fade-in";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import {
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBBox,
  } from "mdbreact";


export default function RegisterSuccess() {
    return (
        <div>
             <FadeIn transitionDuration='1100'>
    <MDBBox
      display="flex"
      justifyContent="center"
    >
      <MDBCard>
        <MDBCardBody className="mx-3">
          <div className="text-center">
            <h3 className="dark-grey-text mb-5">
              <strong>You have successfully registered.</strong>
            </h3>
            <h4 className="dark-grey-text mb-5">
                <strong>Please click here to return to the login screen and sign in with your credentials</strong>
            </h4>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBBox>
    </FadeIn>
        </div>
    )
}
