import React from "react";
import SideBar from "../header/SideBar";
import { MDBCard, MDBCardBody, MDBBox } from "mdbreact";
import FadeIn from "react-fade-in";

import { Link } from "react-router-dom";

function NotesRules() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "250px",
          marginRight: "100px",
          height: "100vh",
        }}
      >
        <div
          className="rulesCard"
          style={
            {
              // position: "absolute",
              // left: "50%",
              // top: "50%",
              // transform: "translate(-50%, -50%)",
            }
          }
        >
          <FadeIn transitionDuration="1100">
            <MDBBox display="flex" justifyContent="center">
              <MDBCard>
                <MDBCardBody className="mx-3">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Rules and Terms of Service</strong>
                    </h3>
                  </div>

                  <div className="text-center">
                    <h2 style={{ marginBottom: "25px" }}>
                      The following are basic rules/guidelines when making your
                      notes public:
                    </h2>
                    <h3 style={{ marginBottom: "25px" }}>1. Be kind. </h3>
                    <h3 style={{ marginBottom: "25px" }}>
                      2. Hate speech and/or harassment of any kind will result
                      in an immediate ban and further action, if warranted.
                    </h3>
                    <h3 style={{ marginBottom: "25px" }}>
                      3. Graphically violent or sexual content is not allowed.
                      Use your best judgement when making notes public.
                    </h3>
                    <h3 style={{ marginBottom: "25px" }}>
                      4. Any attempt to coerce other members to give you money
                      via public note sharing is not allowed. If you are found
                      to be doing this, you will be banned.
                    </h3>
                    <h3 style={{ marginBottom: "25px" }}>
                      5. Any threats of violence or doxxing of any member will
                      be immediately dealt with and handed over to law
                      enforcement.
                    </h3>
                    <h3 style={{ marginBottom: "25px" }}>
                      6. Above all else, please use common sense. If I have to
                      wake up at 3AM because someone is spamming the public note
                      forum, I will ban every single person involved, no
                      appeals, no exceptions.
                    </h3>
                  </div>
                  <div
                    className="col s12"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
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
                        Back
                      </button>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBBox>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export default NotesRules;
