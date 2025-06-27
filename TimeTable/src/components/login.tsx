import React, { useState } from 'react';
import '../styles/Login.css';
import NEC from '../assets/nandha logo (1).svg'

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Invalid username or password.');
      return;
    }

    try {
      const response = await fetch('https://localhost:7244/api/Login/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const loggedInUsername = data.username || username;
        localStorage.setItem('loggedUser', loggedInUsername); // ✅ Store for use in other components

        alert('Login successful!');
        onLoginSuccess(loggedInUsername); // callback to parent component
      } else if (response.status === 401) {
        alert('Incorrect username or password.');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={NEC} alt="Nandha Engineering College Logo" className="logo-image" />
        <p className="logo-text">NANDHA ENGINEERING COLLEGE</p>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className='login-label'>Login Page</h2>
          <div className='user-name'>
          <label>Username :</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
            required
          />
          </div>
          <div className='pass-word'>
          <label>Password :</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>

          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;