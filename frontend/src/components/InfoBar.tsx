import React from 'react';
import "./InfoBar.css";

const InfoBar = () => {
    return (
        <div className="info-bar">
            <div className="info-bar-left">
                <img src="/sp_logo.png" alt="Logo" className="info-bar-logo" />
                <span className="info-bar-username">John Doe</span>
            </div>
            <button className="info-bar-logout">Logout</button>
        </div>
    );
};

export default InfoBar;