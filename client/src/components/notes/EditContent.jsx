import React, { useState, useEffect } from "react";
import {
  useHistory,
  useParams,
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import SideBar from "../header/SideBar";
import axios from "axios";

function EditContent() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [token, setToken] = useState(localStorage.getItem("tokenStore"));

  const parms = useParams().id;

  console.log(parms);
  const [err, setErr] = useState("");

  const history = useHistory();

  useEffect(() => {
    getNote(token);
  }, []);

  const getNote = async (token) => {
    const res = await axios.get(`/api/notes/${parms}`, {
      headers: { Authorization: token },
    });
    setNote({
      title: res.data.title,
      content: res.data.content,
      date: new Date(res.data.date).toLocaleDateString(),
      id: res.data._id,
      isShared: res.data.isShared,
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
    setErr("");
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const { title, content, date, id, isShared } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`/api/notes/${parms}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
      </div>
      <div
        className="YEP"
        style={{
          // width: "70%",
          // height: "40%",
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "20%",
          marginTop: "10%",
          marginRight: "20%",
          //   height: "100vh",
        }}
      >
        <div
          className="card"
          style={{
            width: "75%",
            height: "625px",
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
            maxHeight: "700px",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: 500,
            }}
          >
            Edit Note
          </h1>
          <form onSubmit={editNote} autoComplete="off">
            {/* <h2
            title={note.title}
            style={{
              textOverflow: "ellipsis",
              paddingBottom: "1px",
              fontSize: "26px",
              fontWeight: 400,
            }}
          > */}
            <label
              htmlFor="title"
              style={{
                textOverflow: "ellipsis",
                paddingBottom: "1px",
                fontSize: "26px",
                fontWeight: 400,
                color: "black",
              }}
            >
              Title
            </label>
            <input
              type="text"
              style={{
                border: "1px solid black",
                borderRadius: "11px",
                background: "white",
                fontWeight: "50px",
                fontSize: "40px",
              }}
              value={note.title}
              id="title"
              name="title"
              required
              onChange={onChangeInput}

              //   onClick={onClickTitle}
            />
            {/* </h2> */}
            <h4 style={{ color: "black", fontWeight: 500 }}>{err}</h4>

            <div className="text-wrapper" />
            <label
              htmlFor="content"
              style={{
                textOverflow: "ellipsis",
                paddingBottom: "1px",
                fontSize: "26px",
                fontWeight: 400,
                color: "black",
              }}
            >
              Content
            </label>
            <textarea
              type="text"
              value={note.content}
              id="content"
              name="content"
              required
              style={{
                height: "200px",
                //   maxHeight: "300px",
                overflowY: "break-word",
                fontSize: "40px",
                resize: "none",
                border: "1px solid black",
                borderRadius: "11px",
                background: "white",
                // border: "none",
              }}
              onChange={onChangeInput}
              //   onClick={onClickContent}
            ></textarea>

            <div
              className="col s12"
              style={
                {
                  // display: "flex",
                  //   justifyContent: "right",
                }
              }
            >
              <button
                style={{
                  width: "135px",
                  minWidth: "130px",
                  height: "50px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",

                  color: "black",
                  fontWeight: "900",
                  display: "flex",
                  flexWrap: "wrap",
                  // marginLeft: "250px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                type="submit"
              >
                Create Note
              </button>
              <Link to={"/notes"}>
                <button
                  // onClick={async () => {
                  //   const bigtoken = localStorage.getItem("tokenStore");
                  //   await Axios.put(`api/notes/updateVisibility/${note._id}`, {
                  //     headers: { Authorization: bigtoken },
                  //   });
                  // }}
                  style={{
                    width: "135px",
                    height: "50px",
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
                  Cancel
                </button>
              </Link>

              {/* <Link to={"/notes"}> */}

              {/* </Link> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContent;
