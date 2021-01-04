import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [collapsed, isCollapsed] = useState(false);

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
    <div
      style={{
        background: "linear-gradient(to right, #373b44, #4286f4)",
        borderBottom: "1px solid aqua",
        display: "flex",
      }}
    >
      <h2>
        <Link to="/notes">
          <p
            style={{
              color: "white",
              fontSize: "30px",
              fontFamily: "Righteous",
              marginLeft: "15px",
              marginTop: "8px",
              marginBottom: "2px",
            }}
          >
            NoteRail{" "}
          </p>
        </Link>
      </h2>
      <Grid container justify="flex-end">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(199,199,255,1) 0%, rgba(14,158,187,1) 100%)",
            border: "1px solid black",
            borderRadius: "2px",
          }}
        >
          <MenuIcon style={{ height: "40px" }} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Link to="/profile">
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </div>
  );
}

export default Header;
