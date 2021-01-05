import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import Draggable from "react-draggable";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SideBar from "../header/SideBar";

const formatter = buildFormatter(englishStrings);
function Notes() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("tokenStore");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
      </div>

      <div style={{}}>
        <div
          className="YEP"
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginLeft: "250px",
            marginRight: "100px",
            height: "100vh",
          }}
        >
          {notes.map((note) => (
            <div
              className="card"
              style={{
                width: "275px",
                boxShadow: "2px black",
                background:
                  "linear-gradient(90deg, rgba(238, 174, 202, 1) 9%, rgba(122, 183, 255, 1) 64%)",
                padding: "10px",
                position: "relative",
                color: "black",
                margin: "15px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                maxHeight: "300px",
                flexShrink: 0,
              }}
            >
              <h2
                title={note.title}
                style={{
                  textOverflow: "ellipsis",
                  paddingBottom: "1px",
                  fontSize: "26px",
                }}
              >
                {note.title}
              </h2>
              <div className="text-wrapper"></div>
              <p
                style={{
                  height: "300px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  fontSize: "18px",
                }}
              >
                {note.content}
              </p>

              <p
                className="date"
                style={{
                  textAlign: "right",
                  color: "black",
                  fontSize: "16px",

                  marginBottom: "10px",
                }}
              >
                <TimeAgo date={note.date} formatter={formatter} />
              </p>
              <div
                className="card-footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "45px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: "20px",
                }}
              >
                {note.name}

                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  styles={{}}
                >
                  <SettingsIcon style={{ height: "40px", width: "40px" }} />
                </Button>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
              <button
                className="close"
                style={{
                  position: "absolute",
                  top: 0,
                  right: "10px",
                  fontWeight: "900",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "white",
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
