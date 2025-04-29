import React, { useState } from 'react';
import './NotificationPanel.css';
import NotificationCard from './NotificationCard';

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState([
        { 
            id: 1, 
            title: 'New Patient Admitted', 
            patientId: '12345',
            patientName: 'John Doe',
            patientRoom: '101',
            patientStatus: 'stable',
            time: '2 hours ago' 
        },
        // Add more notifications with the same structure
    ]);

    const handleCloseNotification = (id: number) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const handleGoToPatient = (patientId: string) => {
        // Handle navigation to patient
        console.log(`Going to patient ${patientId}`);
    };

    return (
        <div className="notification-panel">
            <h2>Notifications</h2>
            <div className="notification-cards">
                {notifications.map(notification => (
                    <NotificationCard
                        key={notification.id}
                        title={notification.title}
                        patientId={notification.patientId}
                        patientName={notification.patientName}
                        patientRoom={notification.patientRoom}
                        patientStatus={notification.patientStatus as 'urgent' | 'warning' | 'stable'}
                        time={notification.time}
                        onClose={() => handleCloseNotification(notification.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationPanel;
