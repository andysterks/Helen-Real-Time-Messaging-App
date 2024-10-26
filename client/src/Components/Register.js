import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(e.target.value);

    try {
      const response = await axios
        .post("http://localhost:3000/register", inputValue)
        .then((response) => {
          setInputValue(response.data.message);
          console.log("Navigating to LoginPage");
          navigate("/");
        });

      if (response.status === 200) {
        setMessage(response.data.message);
        console.log("Navigating to LoginPage");
        navigate("/");
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
            value={inputValue.username}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter your username'
          />
        </label>
        <label>
          Email:
          <input
            className='email'
            name='email'
            type='email'
            value={inputValue.email}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter your email'
          />
        </label>
        <label>
          Password:
          <input
            className='passwd'
            name='password'
            type='password'
            value={inputValue.password}
            onChange={(e) => setInputValue(e.target.value)}
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
