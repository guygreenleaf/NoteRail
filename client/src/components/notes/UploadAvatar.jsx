import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import Draggable from "react-draggable";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SideBar from "../header/SideBar";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBBox,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import PublicIcon from "@material-ui/icons/Public";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import FadeIn from "react-fade-in";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const initialState = {
  err: "",
  success: "",
};

function UploadAvatar() {
  const [data, setData] = useState(initialState);
  const { err, success } = data;

  const [token, setToken] = useState("");

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
      // POSSIBLY ADD GIF FUNCTIONALITY
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
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
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
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

                <div>
                  {" "}
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={changeAvatar}
                  ></input>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBBox>
        </FadeIn>
      </div>
    </div>
  );
}

export default UploadAvatar;
