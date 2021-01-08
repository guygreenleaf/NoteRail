import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeIcon from "@material-ui/icons/Home";

function SideBar() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

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

  const userLink = () => {
    return (
      <li>
        <img
          src={user.avatar}
          alt="name"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            // marginLeft: "19px",
            border: "2px solid black",
            borderRadius: "75px",
            boxShadow: "2px 2px grey",
            height: "150px",
            width: "150px",
          }}
        />
        <h3
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "black",
            fontWeight: "400",
            letterSpacing: "2px",
          }}
        >
          {user.name}
        </h3>
      </li>
    );
  };
  return (
    <div className="SideBar">
      <div
        className="logo"
        style={{ marginTop: "25px", marginBottom: "100px" }}
      >
        <ul>{userLink()}</ul>
        {/* <h1>
          <Link
            to="/notes"
            style={{
              color: "black",
              fontWeight: "400",
              letterSpacing: "4px",
              marginLeft: " 12px",
            }}
          >
            NoteRail
          </Link>
        </h1> */}
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        {/* <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        > */}
        <SettingsIcon
          style={{
            height: "40px",
            width: "40px",
          }}
          className="setIcon"
          onClick={handleClick}
        />
        {/* </Button> */}

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <HomeIcon
          style={{
            height: "40px",
            width: "40px",
            marginTop: "100px",
            color: "#282F36",
          }}
          className="setIcon"
          onClick={(event) => (window.location.href = "/notes")}
        />
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        {/* <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        > */}

        <PublicRoundedIcon
          style={{
            height: "40px",
            width: "40px",
            marginTop: "100px",
            color: "#282F36",
          }}
          className="setIcon"
          onClick={(event) => (window.location.href = "/public")}
        ></PublicRoundedIcon>
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        {/* <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        > */}

        <PeopleAltIcon
          style={{
            height: "40px",
            width: "40px",
            marginTop: "100px",
            color: "#282F36",
          }}
          className="setIcon"
          onClick={(event) => (window.location.href = "/public")}
        ></PeopleAltIcon>
      </div>
    </div>
  );
}

export default SideBar;
