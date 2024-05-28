import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  console.log("userName :", userName);
  console.log("password :", password);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/username")
      .then((response) => {
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`The name you entered was: ${userName}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username or Email :
        <input
          type='text'
          value={userName}
          placeholder='Enter username or email'
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type='password'
          minLength='4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
        />
      </label>
      <button type="submit" >Log In</button>
    </form>
  );
}

export default Login;
