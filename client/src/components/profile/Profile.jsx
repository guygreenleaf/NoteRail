import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Draggable from "react-draggable";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SideBar from "../header/SideBar";
import FadeIn from "react-fade-in";
import { MDBCard, MDBCardBody, MDBBox } from "mdbreact";
const formatter = buildFormatter(englishStrings);
function Profile() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("tokenStore"));
  const parms = useParams();
  // const getNotes = (token) => {
  //   console.log(token);
  // };
  // useEffect(() => {
  //   const token = localStorage.getItem("tokenStore");
  //   setToken(token);
  //   if (token) {
  //     getNotes(token);
  //     // console.log(token);
  //   }
  // }, []);

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // let pubiNotes = [];

  // for (const i in notes) {
  //   if (notes[i].isShared === true) {
  //     pubiNotes.push(notes);
  //   }
  // }
  // console.log(pubiNotes);

  useEffect(() => {
    getNote(token);
  }, [token]);

  const getNote = async (token) => {
    const res = await axios.get("/api/notes/public/:id", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
    // console.log(userNotes);
  };

  const bigNotes = [];
  let i = 0;
  for (i in notes) {
    if (notes[i].user_id === parms.user_id) bigNotes.push(notes[i]);
  }

  return (
    <div>
      <FadeIn transitionDuration="800">
        <div style={{ display: "flex" }}>
          <SideBar></SideBar>
        </div>

        {bigNotes.length === 0 ? (
          <></>
        ) : (
          <div
            style={{
              height: "6vh",
              width: "18vw",
              marginLeft: "250px",
              marginBottom: "50px",
              marginTop: "30px",
              // border: "1px solid black",
              // borderRadius: "30px",
              // background:
              //   "linear-gradient(90deg, rgba(238, 174, 202, 1) 9%, rgba(122, 183, 255, 1) 64%)",
            }}
          >
            <h3
              className="profName"
            >
              {notes[0].name}'s Public Notes
            </h3>
          </div>
        )}

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
            {bigNotes.length === 0 ? (
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
                            <strong>
                              There are no public notes yet or you've been
                              banned from the public note page.
                            </strong>
                          </h3>
                        </div>

                        <div></div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBBox>
                </FadeIn>
              </div>
            ) : (
              bigNotes.map((note) => (
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

export default Profile;
