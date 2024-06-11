import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => email.length > 0 && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });

      setMessage('Login successful');
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('User not found, redirecting to register...');
        navigate('/register');
      } else {
        setMessage('Invalid email or password');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
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
        <button type='submit' disabled={!validateForm()}>Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
