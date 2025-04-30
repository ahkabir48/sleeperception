import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./InfoBar.css";

const InfoBar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="info-bar">
            <div className="info-bar-left">
                <img src="/sp_logo.png" alt="Logo" className="info-bar-logo" />
                <span className="info-bar-username">John Doe</span>
            </div>
            <button className="info-bar-logout" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default InfoBar;