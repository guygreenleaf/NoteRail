import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Header from './components/header/Header'
import Body from './components/body/Body'
import Landing from './components/Landing'

function App() {
  return (

    <Router>
      <div className="App">
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <Landing></Landing>
      </div>
      <Body />
        
      </div>
    </Router>
  );
}

export default App;
