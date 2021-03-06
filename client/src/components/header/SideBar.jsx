import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import PublicRoundedIcon from "@material-ui/icons/PublicRounded";
import HomeIcon from "@material-ui/icons/Home";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
function SideBar() {
  const auth = useSelector((state) => state.auth);

  const { user } = auth;

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
          className="userImage"
          src={user.avatar}
          alt="name"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            border: "2px solid black",
            borderRadius: "75px",
            boxShadow: "2px 2px grey",
            height: "150px",
            width: "150px",
          }}
        />
        <h3
          className="bigName"
          style={{
            textAlign: "center",
            marginTop: "10px",

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
      <div className="logo" style={{ marginTop: "25px" }}>
        <ul>{userLink()}</ul>
      </div>
      <div
        className="settingsIconSidebar"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SettingsIcon
          style={{
            height: "30px",
            width: "30px",
            marginBottom: "20px",
          }}
          className="setIcon"
          onClick={handleClick}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/uploadProfile" style={{ color: "black" }}>
            <MenuItem>Upload Avatar</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <Link to="/reportBug" style={{ color: "black" }}>
            <MenuItem>Report Bug</MenuItem>
          </Link>
        </Menu>
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HomeIcon
          style={{
            height: "40px",
            width: "40px",
          }}
          className="homeIcon"
          onClick={(event) => (window.location.href = "/notes")}
        />
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PublicRoundedIcon
          style={{
            height: "40px",
            width: "40px",
          }}
          className="publicIcon"
          onClick={(event) => (window.location.href = "/public")}
        ></PublicRoundedIcon>
      </div>
      <div
        className="settingsIcon"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/create" className="addIconLink">
          <AddToPhotosIcon
            style={{
              height: "40px",
              width: "40px",
            }}
            className="addIcon"
            onClick={(event) => (window.location.href = "/create")}
          ></AddToPhotosIcon>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
