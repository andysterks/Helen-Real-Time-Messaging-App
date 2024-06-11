import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () =>
    email.length > 0 && password.length > 0 && username.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        email,
        password,
      });

      setMessage("Registration successful:", response.data);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage("Email already registered");
      } else {
        setMessage("Error registering. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
        </label>
        <label>
          Email:
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </label>
        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </label>
        <button type='submit' disabled={!validateForm()}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
