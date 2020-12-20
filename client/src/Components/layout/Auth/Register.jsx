import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import FadeIn from "react-fade-in";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      lastErrors: null,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

    //POSSIBLE ERROR, MAY NEED TO REVISE. REFACTORED FROM ^ ACCORDING TO REACT DOC PRACTICES
  static getDerivedStateFromProps(props, state) {
    if(props.errors !== state.errors){
      return{
        errors: props.errors,
        lastErrors: props.errors,
      }
    }
    return null;
    }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
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
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    id="username"
                    type="text"
                    className={classnames("", {
                      invalid: errors.name,
                    })}
                  />
                  <label htmlFor="name">Username</label>
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                    invalid: errors.email
                  })}
                  />
                  <label htmlFor="email">Email</label>
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                    invalid: errors.password
                  })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                    invalid: errors.password2
                  })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
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
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
