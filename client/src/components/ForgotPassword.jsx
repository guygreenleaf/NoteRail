import React from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBBox,
  MDBCardBody,
  MDBFooter,
} from "mdbreact";
import "mdbreact/dist/css/mdb.css";
import FadeIn from "react-fade-in";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const [err, setErr] = useState("");
  // const { email, password, err, success } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const [modal, setModal] = useState(false);

  const modalClick = (e) => {
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post("/user/forgot", {
        email: user.email,
      });
      setUser({ email: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg &&
        setErr(
          <FadeIn transitionDuration="1100">{err.response.data.msg}</FadeIn>
        );
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
        <MDBBox display="flex" justifyContent="center">
          <MDBCard>
            <MDBCardBody className="mx-3">
              <div className="text-center">
                <h3 className="dark-grey-text mb-5">
                  <strong>Forgot your password?</strong>
                </h3>
                <h5 className="dark-grey-text">
                  Enter your email to reset your password.
                </h5>
                <h6 style={{ color: "black" }}>{err}</h6>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-field col s12">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={user.email}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      height: "55px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "5px",
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <div style={{ marginTop: "10px" }}>
                <Link
                  to="/"
                  className="blue-text"
                  style={{ marginLeft: "20px" }}
                >
                  Back to login
                </Link>
              </div>
            </MDBCardBody>
            <MDBFooter className="mx-5 pt-3 mb-1 bg-white">
              <p
                className="font-small grey-text"
                style={{ marginRight: "30px" }}
              >
                Not a member?
                <Link to="/register" className="blue-text ml-1">
                  Sign Up
                </Link>
              </p>

              <p
                className="font-small grey-text"
                style={{ marginRight: "30px" }}
              ></p>
            </MDBFooter>
          </MDBCard>
        </MDBBox>
      </FadeIn>
    </div>
  );
};

export default ForgotPassword;
