import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBMask,
  MDBView,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [collapsed, isCollapsed] = useState(false);
  const [isWideEnough, isWide] = useState(false);

  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const onClick = () => {
    isCollapsed(!collapsed);
  };
  // const userLink = () => {
  //     return <li className="drop-nav"
  // }
  return (
    <div
      style={{
        background: "linear-gradient(to right, #373b44, #4286f4)",
        borderBottom: "1px solid aqua",
        display: "flex",
      }}
    >
      <h2>
        <Link
          to="/notes"
          style={{
            color: "white",
            fontSize: "18px",
            fontFamily: "Righteous",
            marginLeft: "15px",
          }}
        >
          NoteRail
        </Link>
      </h2>
      <Grid container justify="flex-end">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Open Menu
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
      </Grid>
    </div>
  );
}

export default Header;
