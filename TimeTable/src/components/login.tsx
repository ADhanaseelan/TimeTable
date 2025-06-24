import React, { useState } from 'react';
import '../styles/Login.css';

interface LoginProps {
  onLoginSuccess: (email:string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@12' && password === '123456') {
      onLoginSuccess(email);
    } else {
      alert('Invalid email or password.');
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
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
