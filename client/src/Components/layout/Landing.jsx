import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBBox,
} from "mdbreact";
import FadeIn from 'react-fade-in';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


class Landing extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      lastLogin:null,
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/dashboard"); // push user to dashboard when they login
//     }
// if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }


  //POSSIBLE ERROR, MAY NEED TO REVISE. REFACTORED FROM ^ ACCORDING TO REACT DOC PRACTICES
  static getDerivedStateFromProps(props, state) {
    if(props.auth.isAuthenticated){
      props.history.push("/dashboard");
    }
    if(props.errors !== state.errors){
      return{
        errors: props.errors,
        lastErrors: props.errors,
      }
    }
    return null;
    }


  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.state.someStatefulValue !==
  //     prevState.someStatefulValue
  //   ) {
  //     this.props.onChange(this.state.someStatefulValue);
  //   }
  // }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
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
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
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
Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Landing);