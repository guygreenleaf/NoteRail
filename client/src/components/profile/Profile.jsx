import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import englishStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import SideBar from "../header/SideBar";
import FadeIn from "react-fade-in";
import { MDBCard, MDBCardBody, MDBBox } from "mdbreact";
const formatter = buildFormatter(englishStrings);
function Profile() {
  const [notes, setNotes] = useState([]);
  const [token] = useState(localStorage.getItem("tokenStore"));
  const parms = useParams();
  const parmid = useParams().id;

  const [pfp, setPfp] = useState("");

  useEffect(() => {
    const getNote = async () => {
      const res = await axios.get(`/api/notes/public/${parmid}`, {
        headers: { Authorization: token },
      });
      setNotes(res.data);
    };
    getNote();
  }, [parmid, token]);

  useEffect(() => {
    const getPfp = async () => {
      const res = await axios.get(`/user/userAvatar/${parms.user_id}`, {
        headers: { Authorization: token },
      });
      setPfp(res.data);
    };
    getPfp();
  }, [parmid, token]);

  const bigNotes = [];
  let i = 0;
  for (i in notes) {
    if (notes[i].user_id === parms.user_id) bigNotes.push(notes[i]);
  }
  return (
    <div>
      <FadeIn transitionDuration="800">
        <div style={{}}>
          <SideBar></SideBar>
        </div>

        {bigNotes.length === 0 ? (
          <></>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "6vh",
              width: "18vw",
              marginLeft: "200px",
              marginBottom: "50px",
              paddingTop:"5px",
              
            }}
          >
            <h3 className="profName">
              {" "}
              <img
                className="userImage"
                src={pfp}
                alt="name"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: "15px",
                  marginRight: "10px",
                  // marginLeft: "19px",
                  border: "2px solid black",
                  borderRadius: "75px",
                  boxShadow: "2px 2px grey",
                  height: "90px",
                  width: "90px",
                }}
              />
              <p style={{ marginTop: "20px" }}>
                {bigNotes[0].name}
                's Public Notes
              </p>{" "}
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
