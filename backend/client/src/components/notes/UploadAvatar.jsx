import React, { useState, useEffect } from "react";
import axios from "axios";

import SideBar from "../header/SideBar";

import { MDBBox, MDBCard, MDBCardBody } from "mdbreact";

import FadeIn from "react-fade-in";
import { useSelector } from "react-redux";

const initialState = {
  err: "",
  success: "",
};

function UploadAvatar() {
  const [data, setData] = useState(initialState);
  const { err, success } = data;

  const [token, setToken] = useState("");
  const [avatar, setAvatar] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
  }, []);

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({ ...data, err: "No file was uploaded.", success: "" });

      if (file.size > 1024 * 1024) {
        return setData({ ...data, err: "File size too large", success: "" });
      }

      // POSSIBLY ADD GIF FUNCTIONALITY
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err:
            "Incorrect file format. Allowed types: .jpeg , .png (gifs coming soon!)",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setData({
        ...data,
        err: "",
        success: "Profile picture successfully uploaded!",
      });
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfor = () => {
    try {
      axios.patch(
        "/user/update",
        {
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, err: "", success: "Updated Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (avatar) updateInfor();
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
      </div>
      <div
        className="docker"
        style={{ marginLeft: "300px", marginTop: "100px" }}
      >
        <FadeIn transitionDuration="1100">
          <MDBBox display="flex" justifyContent="center">
            <MDBCard>
              <MDBCardBody className="mx-3">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Upload a new avatar here.</strong>
                    <br></br>
                    Your picture will automatically be scaled appropriately.
                  </h3>
                </div>
                <h3 style={{ color: "red" }}>{err}</h3>
                <h3 style={{ color: "red" }}>{success}</h3>
                <img
                  src={avatar ? avatar : user.avatar}
                  alt=""
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "2px solid black",
                    borderRadius: "75px",
                    boxShadow: "2px 2px grey",
                    height: "150px",
                    width: "150px",
                  }}
                />
                <div>
                  {" "}
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                  ></input>
                </div>
                <button
                  onClick={handleUpdate}
                  style={{
                    width: "135px",
                    marginLeft: "450px",
                    height: "45px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    color: "black",
                    fontWeight: "900",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Confirm
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBBox>
        </FadeIn>
      </div>
    </div>
  );
}

export default UploadAvatar;
