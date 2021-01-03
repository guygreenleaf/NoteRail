import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import { format } from "timeago";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes", {
      headers: { Authorization: token },
    });
    console.log(res);
  };

  useEffect(() => {
    if(localStorage.getItem("firstLogin") === true){
      getNotes()
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
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Header></Header>
      {/* //Logout button */}
      <div
        className="note-wrapper"
        style={{
          maxWidth: "1920px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: "auto",
        }}
      >
        <div
          className="card"
          style={{
            width: "300px",
            boxShadow: "2px black",
            background:
              "linear-gradient(90deg, rgba(238, 174, 202, 1) 9%, rgba(122, 183, 255, 1) 64%)",
            padding: "10px",
            position: "relative",
            color: "black",
            margin: "15px",
            cursor: "pointer",
          }}
        >
          <h4
            title="Note Title"
            style={{
              marginRight: "10px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Note Title
          </h4>
          <div className="text-wrapper"></div>
          <p>
            some text ome textome text ome text ome text ome text ome text ome
            text ome text ome text ome textome textome textome textome textome
            textome textome textome textome textome textome textome textome
            textome textome textome textome textome textome text
          </p>

          <p className="date" style={{ textAlign: "right", color: "black" }}>
            Note Date
          </p>
          <div
            className="card-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "40px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "12px",
            }}
          >
            User Name
            {/* <Link to="/" style={{ color: "black" }}>
              Edit
            </Link> */}
            {/* NOTE! THIS SHOULD ONLY SHOW IF THE USER ID OF THE NOTE MATCHES THE LOGGED IN USERS ID!!!! */}
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <SettingsIcon />
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
      </div>
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "125px",
            height: "47px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",
          }}
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Notes;
