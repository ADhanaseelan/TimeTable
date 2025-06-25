import React, { useState } from 'react';
import '../styles/Login.css';

interface LoginProps {
  onLoginSuccess: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      onLoginSuccess(username);
    } else {
      alert('Invalid username or password.');
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
          <div className="options">
            {/* <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a> */}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;