import React from "react";
import axios from "axios";
import Header from "../header/Header";

function Notes() {
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
