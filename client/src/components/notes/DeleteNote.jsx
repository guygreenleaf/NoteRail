import React, { useState, useEffect } from "react";
import SideBar from "../header/SideBar";
import { MDBCard, MDBCardBody, MDBFooter, MDBBox } from "mdbreact";
import FadeIn from "react-fade-in";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";

function DeleteNote() {
  const [note, setNotes] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
    isShared: "",
  });
  const [token, setToken] = useState("");

  let { id } = useParams();

  //   console.log(id);
  //   const getNote = async (token) => {
  //     const res = await Axios.get(`api/notes/${id}`, {
  //       headers: { Authorization: token },
  //     });
  //     // console.log(res.data);
  //     setNotes(res.data);
  //   };

  //   console.log(note);
  //   useEffect(() => {
  //     const token = localStorage.getItem("tokenStore");
  //     setToken(token);
  //     if (token) {
  //       getNote(token);
  //     }
  //   }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
      </div>

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
                    <strong>WARNING!</strong>
                  </h3>
                </div>

                <div className="text-center">
                  <h4>
                    You are about to PERMANENTLY delete your note. This cannot
                    be undone.
                  </h4>
                </div>
                <div
                  className="col s12"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Link to={"/notes"}>
                    <button
                      onClick={async () => {
                        const bigtoken = localStorage.getItem("tokenStore");
                        await Axios.delete(`api/notes/${id}`, {
                          headers: { Authorization: bigtoken },
                        });
                      }}
                      style={{
                        width: "135px",
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
                  </Link>

                  <Link to={"/notes"}>
                    <button
                      style={{
                        width: "135px",
                        height: "45px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        background:
                          "linear-gradient(90deg, rgba(238, 174, 202, 1) 9%, rgba(122, 183, 255, 1) 64%)",

                        color: "black",
                        fontWeight: "900",
                      }}
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBBox>
        </FadeIn>
      </div>
    </div>
  );
}

export default DeleteNote;
