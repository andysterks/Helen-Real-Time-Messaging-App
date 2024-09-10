import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Authorization/LogIn.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:", email)
    console.log("password:", password)

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      setMessage(response.data.message);
     
      localStorage.setItem('token', response.data.token);
      console.log("Server response:", response.data);
      if (response.status === 200) {
        setMessage("Login successful");
        localStorage.setItem("token", response.data.token);
        console.log("Navigating to HomePage");
        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage("User not found. Redirecting to register...");
          console.log("Navigating to Register");
          setTimeout(() => {
            navigate("/register");
          }, 2000);
        } else if (error.response.status === 401) {
          setMessage("Invalid email or password. Please try again.");
        } else {
          setMessage(`An error occurred: ${error.response.statusText}`);
        }
      }
    }
  };

  return (
    <div>
      <form className='login' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label htmlFor='email'>Email:</label>
        <input className="input"
          id='email'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          title='Please enter a valid e-mail'
          required
        />
        <label className='password'>Password:</label>
        <input
          id='password'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your password'
          title="Please enter correct password!"
          required
        />
        <button type='submit'>Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
