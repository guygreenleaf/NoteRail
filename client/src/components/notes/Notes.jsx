import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
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
} from "mdbreact";

const formatter = buildFormatter(englishStrings);
function Notes() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
    isShared: "",
  });
  const [modalVis, isVisible] = useState(false);

  const [clicked, setClick] = useState(false);

  const handleIconClick = (id) => {
    setClick(true);
  };

  // const toggleModal = () => {
  //   isVisible(!modalVis);
  //   handleClose();
  // };

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

  ///FIGURE THIS SHIT OUT NOW W W W W W

  const changeVisible = (e) => {
    const token = localStorage.getItem("tokenStore");
    // const res = await axios.get("api/notes/", {
    //   headers: { Authorization: token },
    // });
    console.log(note.id);
    // console.log(res.data);
    // console.log();
    // if (token) {
    //   const { title, content, date, id, isShared } = note;
    //   await axios.put(`/api/notes/updateVisibility${id}`, {
    //     headers: { Authorization: token },
    //   });
    // }
  };
  // console.log(notes);

  const testerFunc = (em) => {
    console.log(em);
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
                // cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                maxHeight: "300px",
                flexShrink: 0,
              }}
              key={note._id}
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

              <div
                className="date"
                style={{
                  textAlign: "right",
                  color: "black",
                  fontSize: "16px",
                  marginBottom: "0px",
                }}
              >
                <TimeAgo
                  className="testTime"
                  date={note.date}
                  formatter={formatter}
                />

                {note.isShared ? (
                  <p
                    style={{
                      fontSize: "15px",
                      letterSpacing: "1px",
                      display: "flex",
                      justifyContent: "left",
                      marginLeft: "200px",
                    }}
                  >
                    Public
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "15px",
                      letterSpacing: "1px",
                      // display: "flex",
                      justifyContent: "left",
                      marginLeft: "125px",
                    }}
                  >
                    Private
                  </p>
                )}
              </div>

              <div
                className="card-footer"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "50px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontSize: "20px",
                }}
              >
                {note.name}

                {note.isShared ? (
                  <Link to={`/${note._id}`}>
                    <div
                    // onClick={async () => {
                    //   const bigtoken = localStorage.getItem("tokenStore");
                    //   await axios.put(
                    //     `api/notes/updateVisibility/${note._id}`,
                    //     {
                    //       headers: { Authorization: bigtoken },
                    //     }
                    //   );
                    // }}
                    >
                      <MDBIcon
                        icon="edit"
                        className="screenIcon"
                        size="lg"
                        style={{
                          color: "#0F1720",
                          marginLeft: "3px",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "800",
                        height: 0,
                        cursor: "default",
                        color: "black",
                        letterSpacing: "1px",
                      }}
                    >
                      Edit
                    </p>
                  </Link>
                ) : (
                  <div
                    onClick={async () => {
                      const bigtoken = localStorage.getItem("tokenStore");
                      await axios.put(
                        `api/notes/updateVisibility/${note._id}`,
                        {
                          headers: { Authorization: bigtoken },
                        }
                      );
                    }}
                  >
                    <ScreenShareIcon
                      className="screenIcon"
                      style={{
                        height: "30px",
                        width: "30px",
                      }}
                    ></ScreenShareIcon>
                  </div>
                )}

                <div style={{ width: "20px", marginRight: "25px" }}>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{
                      background: "transparent",
                      boxShadow: "none",
                    }}
                  >
                    <AssignmentRoundedIcon
                      style={{
                        height: "30px",
                        width: "30px",
                      }}
                    />
                  </Button>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to={`edit/${note._id}`} style={{ color: "black" }}>
                    <MenuItem>Edit Note</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Share Note</MenuItem>
                  {/* <MenuItem onClick={changeVisible}>
                    Change Note Visibility
                  </MenuItem> */}
                  <MenuItem onClick={handleClose}>Delete Note</MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notes;
