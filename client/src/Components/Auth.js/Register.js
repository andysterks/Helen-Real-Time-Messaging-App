import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Components/Auth.js/Auth.css";



function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () =>
    email.length > 0 && password.length > 0 && username.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    setMessage("");
    // setUsername("");
    // setEmail("");
    // setPassword("");

    console.log("Submitting registration with:", {
      username,
      email,
      password,
    });

    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        // Expecting 201 Created for successful registration
        setMessage("Registration successful!");
        console.log("Navigating to Login");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error in registration request:", error);
        if (error.response) {
          if (error.response.status === 409) {
            setMessage("Email already registered");
          } else if (error.response.status === 500) {
            setMessage("Internal server error. Please try again later.");
            console.error("Server error details:", error.response.data);
      }
      else {
        setMessage(
          "Error: " + (error.response.data.message || "Registration failed")
        );
      }
          } else if (error.request) {
            setMessage("No response from server. Please check your connection.");
          } else {
            setMessage("Error registering. Please try again.");
          }
        }
      } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <label>
          Username:
          <input
            className='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter your username'
          />
        </label>
        <label>
          Email:
          <input
          className="email"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </label>
        <label>
          Password:
          <input
           className="passwd"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </label>
        <button type='submit' disabled ={!validateForm() || loading}>
        {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
