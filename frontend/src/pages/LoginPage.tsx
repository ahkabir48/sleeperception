import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const { login, isLoading, error } = useAuth();

    const validateForm = () => {
        if (!username.trim()) {
            setFormError('Username is required');
            return false;
        }
        if (!password) {
            setFormError('Password is required');
            return false;
        }
        if (password.length < 8) {
            setFormError('Password must be at least 8 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!validateForm()) return;

        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            // Error is already handled by AuthContext
            // We don't need to do anything here
        }
    };

  return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">SleePerception</h2>
                <img src="/sp_logo.png" alt="Logo" className="login-logo" />
                {(formError || error) && (
                    <div className="error-message">
                        {formError || error}
      </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
      <input 
                            type="text"
                            id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
      />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
      <input 
                            type="password"
                            id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
      />
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={isLoading ? 'loading' : ''}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
    </div>
  );
};

export default LoginPage; 