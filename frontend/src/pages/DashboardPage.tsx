import React from 'react';
import "./DashboardPage.css";
import InfoBar from '../components/InfoBar';
import NotificationPanel from '../components/NotificationPanel';
import PatientList from '../components/PatientList';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            <InfoBar />
            <div className="dashboard-content">
                <NotificationPanel />
                <PatientList />
            </div>
        </div>
    );
};

export default DashboardPage;