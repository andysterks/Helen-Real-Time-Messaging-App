import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(e.target.value);

    // console.log("Submitting registration with:", {
    //   username,
    //   email,
    //   password,
    // });

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        console.log("Navigating to LoginPage");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already registered. Try Logging in.");
      } else {
        setMessage("Error registering. Please try again.");
      }
    }
  };

  return (
    <div>
      <form className='register' onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>
          Username:
          <input
            className='username'
            name='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
        </label>
        <label>
          Email:
          <input
            className='email'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </label>
        <label>
          Password:
          <input
            className='passwd'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </label>
        <button type='submit' onSubmit={handleSubmit}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
