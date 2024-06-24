import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => email.length > 0 && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      console.log("Server response:", response.data);
      if (response.status === 200) {
        setMessage("Login successful");
        sessionStorage.setItem("token", response.data.token);
        console.log("Navigating to HomePage");
        navigate("/HomePage");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("User not found. Redirecting to register...");
          console.log("Navigating to Register");
          setTimeout(() => {
            navigate("/Register");
          }, 2000);
        } else if (error.response.status === 401) {
          setMessage("Invalid email or password. Please try again.");
        } else {
          setMessage(`An error occurred: ${error.response.statusText}`);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("No response from server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setMessage(
          "Unable to connect to the server. Please check your connection and try again."
        );
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
          required
        />
        <button type='submit' disabled={!validateForm()}>
          Log In
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
