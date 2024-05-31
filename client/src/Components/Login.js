import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  
  const [ username, setUsername] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
 

  

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/username")
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(["username :", username],
    ["email:",email],
    ["password :",password]
    )
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <label>
        Username:
        <input
          type='text'
          name='username'
          value={username}
          placeholder='Enter username or email'
          onChange={(e) =>setUsername(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) =>setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type='password'
          name='password'
          minLength='4'
          value={password}
          onChange={(e) =>setPassword( e.target.value)}
          placeholder='Enter your password'
        />
      </label>
      <button type='submit' 
      // onClick={}
      >Log In</button>
    </form>
  );
}

export default Login;
