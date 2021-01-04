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
      {" "}
      <SideBar></SideBar>
      <div className="TESTTHIS">
        <div style={{ position: "relative" }}>
          <div
            className="YEP"
            style={{
              // top: 0,
              display: "flex",
              flexWrap: "wrap",
              // paddingLeft: "200px",
              // paddingRight: "300px",
              marginLeft: "250px",
              marginRight: "100px",
              height: "100vh",
              // width: "50vh",
              // paddingLeft: "50px",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {/* //Logout button */}

            {/* <Header></Header> */}
            {/* <div
        className="note-wrapper"
        style={{
          maxWidth: "1920px",
          // width: "100vw",
          // flexWrap: "wrap",
          // justifyContent: "center",
          // maxHeight: "150px",
        }}
      > */}
            {/* <div
          className="BigCock"
          style={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            // paddingTop: "50px",
          }}
        > */}
            {/* <SideBar></SideBar> */}
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
                  // minHeight: "275px",
                }}
              >
                <h2
                  title={note.title}
                  style={{
                    // marginRight: "10px",
                    // overflow: "visible",
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
                    // minWidth: "400px",
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
                    // marginTop: "100px",
                  }}
                >
                  {note.name}
                  {/* <Link to="/" style={{ color: "black" }}>
              Edit
            </Link> */}

                  {/* NOTE! THIS SHOULD ONLY SHOW IF THE USER ID OF THE NOTE MATCHES THE LOGGED IN USERS ID!!!! */}

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
                  {/* SEE NOTE!!!!!! */}
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
            {/* </div> */}
            {/* </div> */}

            {/* <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                onClick={handleLogout}
                style={{
                  width: "125px",
                  height: "47px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
