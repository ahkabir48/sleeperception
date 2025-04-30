import React, { useState } from 'react';
import './NotificationPanel.css';
import NotificationCard from './NotificationCard';
import { patientData } from '../data/patients';
import { notificationData } from '../data/notifications';

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState(notificationData);

    const handleCloseNotification = (id: number) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    return (
        <div className="notification-panel">
            <h2>Notifications</h2>
            <div className="notification-cards">
                {notifications.map(notification => {
                    const patient = patientData[notification.patientId];
                    return (
                        <NotificationCard
                            key={notification.id}
                            title={notification.title}
                            patientId={notification.patientId}
                            patientName={patient.name}
                            patientRoom={patient.roomNumber}
                            patientStatus={patient.status as 'urgent' | 'warning' | 'stable'}
                            time={notification.time}
                            onClose={() => handleCloseNotification(notification.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationPanel;
