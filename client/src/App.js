import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login";

function App({userName, password}) {
  const [name, setName] = useState("unknown");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/name")
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
       <Login 
     
       />
        <p>{name} is the best! </p>
      
      </header>
    </div>
  );
}

export default App;
