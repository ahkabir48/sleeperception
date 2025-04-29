import React from 'react';
import { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div className="landing-container">
      <h1 className="landing-title">SleePerception</h1>
      <div className="landing-logo">
        <img src="/sp_logo.png" alt="Logo" className="logo-image" />
      </div>
      <input 
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="login-button">Login</button>
    </div>
  );
};

export default LoginPage; 