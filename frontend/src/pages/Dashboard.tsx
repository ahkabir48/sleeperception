import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/PatientList';
import NotificationPanel from '../components/NotificationPanel';
import './Dashboard.css';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </header>
            <div className="dashboard-content">
                <PatientList />
                <NotificationPanel />
            </div>
        </div>
    );
};

export default Dashboard; 