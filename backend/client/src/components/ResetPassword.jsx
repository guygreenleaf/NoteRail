import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FadeIn from "react-fade-in";
import Axios from "axios";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
};

function ResetPassword() {
  const isLength = (password) => {
    if (password.length < 6) return true;
    return false;
  };

  const isMatch = (password, cf_password) => {
    if (password === cf_password) return true;
    return false;
  };
  const [data, setData] = useState(initialState);
  const { password, cf_password, err } = data;
  // const [user, setUser] = useState({
  //   password: "",
  //   password2: "",
  // });

  const { token } = useParams();

  // const [err, setErr] = useState("");

  const [isHidden, hiding] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "" });

    // setUser({ ...user, [name]: value });
    // setErr("");
  };
  // const clearState = () => {
  //   setUser({ password: "", password2: "" });
  // };

  const changeSubmit = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match." });

    try {
      await Axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      bigSubmitter();
      return setData({ ...data, err: "" });
    } catch (err) {
      err.response.data.msg && setData({ ...data, err: err.response.data.msg });
    }

    // e.preventDefault();
    // if (user.password !== user.password2) {
    //   return setErr("Passwords do not match. Please try again");
    // } else {
    //   try {
    //     const res = await Axios.post("/user/reset", user.password, {
    //       headers: { Authorization: token },
    //     });

    //     return setErr(res.data.msg);
    //   } catch (err) {
    //     err.response.data.msg && setErr(err.response.data.msg);
    //   }
    // }
  };

  const bigSubmitter = () => {
    hiding(false);
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
                  <b>Reset</b> password
                </h4>
                <h4 style={{ color: "red" }}>{err}</h4>
              </div>
              {/* <form
                noValidate
                onSubmit={changeSubmit} 
              > */}
              <Link to="/" style={{ marginLeft: "12px" }} hidden={isHidden}>
                {" "}
                You have successfully changed your password. Click here to
                return to the sign in page.
              </Link>
              <div className="input-field col s12">
                <input
                  required
                  onChange={onChange}
                  value={password}
                  // error={errors.password}
                  id="password"
                  type="password"
                  name="password"
                  //     className={classnames("", {
                  //     invalid: errors.password
                  //   })}
                />
                <label htmlFor="cf_password">Password</label>
              </div>
              <div className="input-field col s12">
                <input
                  required
                  onChange={onChange}
                  value={cf_password}
                  // error={errors.password2}
                  id="cf_password"
                  type="password"
                  name="cf_password"
                  //     className={classnames("", {
                  //     invalid: errors.password2
                  //   })}
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "2px" }}>
                <button
                  style={{
                    marginBottom: "25px",
                    width: "145px",
                    height: "49px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "white",
                  }}
                  // type="submit"
                  onClick={changeSubmit}
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Change Password
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default ResetPassword;
