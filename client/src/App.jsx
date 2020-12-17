import React from "react";
import { useState } from "react";



import Login from './Components/Login/LoginCard';

function App() {
  const [counter, count] = useState(0);


  return (
    <div className="app-routes" style={{backgroundColor:'grey'}}>
      <h1 onClick={()=>count(counter+1)}>{counter}</h1>
    </div>
  );
}

export default App;
