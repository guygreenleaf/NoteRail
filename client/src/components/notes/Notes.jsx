import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SideBar from "../header/SideBar";

import { MDBBox, MDBCard, MDBCardBody } from "mdbreact";
import PublicIcon from "@material-ui/icons/Public";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import FadeIn from "react-fade-in";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const formatter = buildFormatter(englishStrings);
function Notes() {
  const [notes, setNotes] = useState([]);

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    if (token) {
      getNotes(token);
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <FadeIn transitionDuration="800">
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
            {notes.length === 0 ? (
              <div className="welcomeCard" style={{}}>
                <FadeIn transitionDuration="1100">
                  <MDBBox display="flex" justifyContent="center">
                    <MDBCard>
                      <MDBCardBody className="mx-3">
                        <div className="text-center">
                          <h3 className="dark-grey-text mb-5">
                            <strong>Welcome!</strong>
                          </h3>
                        </div>

                        <div>
                          <h4
                            style={{
                              lineHeight: "40px",
                              display: "flex",
                              textAlign: "center",
                            }}
                          >
                            A good first step is to change your profile picture
                            - click the settings cog on the left and click
                            "Upload Avatar" to change it.
                            <br></br>
                            <br></br>
                            To add notes - click the "Add Note" icon (Square
                            with the + on it) to the left. Notes are created
                            private by default. To share them, click the globe
                            icon that appears on a note you create. The pencil
                            button will edit your notes. The trashcan icon
                            deletes notes. Once you create your first note, this
                            message will disappear and your notes will be shown
                            here.
                            <br></br>
                            To view notes that have been made public - click the
                            globe icon in the sidebar. You can click on a
                            member's name to view their profile to see all the
                            notes they've made public.
                            <br></br>
                            <br></br>
                          </h4>
                          <h4>
                            <Link to={"/rules"}>
                              If you're new, please click here to view the rules
                              on public notes
                            </Link>
                          </h4>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBBox>
                </FadeIn>
              </div>
            ) : (
              notes.map((note) => (
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
                    <Link to={`/editContent/${note._id}`}>
                      <EditIcon
                        className="settingsIcon"
                        style={{
                          height: "30px",
                          width: "30px",
                          float: "left",
                          color: "#0F1720",
                        }}
                      />
                    </Link>
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
                        <div>
                          <PublicIcon
                            icon="edit"
                            className="screenIcon"
                            size="lg"
                            style={{
                              color: "#0F1720",
                              marginLeft: "",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link to={`/${note._id}`}>
                        <div>
                          <VpnLockIcon
                            className="screenIcon"
                            style={{
                              height: "30px",
                              width: "30px",
                              color: "red",
                            }}
                          ></VpnLockIcon>
                        </div>
                      </Link>
                    )}
                    <div style={{ width: "20px", marginRight: "25px" }}>
                      <Link to={`/delNote/${note._id}`}>
                        <DeleteForeverIcon
                          className="screenIcon"
                          style={{
                            height: "35px",
                            width: "35px",
                            color: "#0F1720",
                          }}
                        />
                      </Link>
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
                      <MenuItem onClick={handleClose}>Delete Note</MenuItem>
                    </Menu>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default Notes;
