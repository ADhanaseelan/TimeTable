import React, { useState } from 'react';
import '../styles/Login.css';

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
        <h3 className="logo-text">NANDHA ENGINEERING COLLEGE</h3>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login Page</h2>

          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
