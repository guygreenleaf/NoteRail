import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.scss";
import App from "./App";
import DataProvider from "./redux/store";
import "./index.css";
ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,

  document.getElementById("root")
);
