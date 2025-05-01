import React, { useState, useEffect } from 'react';
import './NotificationPanel.css';
import NotificationCard from './NotificationCard';

interface Patient {
    id: string;
    name: string;
    room_number: string;
    status: 'stable' | 'warning' | 'urgent';
}

interface Notification {
    id: number;
    title: string;
    patient_id: string;
    time: string;
    is_read: boolean;
}

const NotificationPanel = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [patients, setPatients] = useState<Record<string, Patient>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch patients first
                const patientsResponse = await fetch('http://localhost:3001/api/patients');
                if (!patientsResponse.ok) {
                    throw new Error('Failed to fetch patients');
                }
                const patientsData = await patientsResponse.json();
                
                // Convert patients array to record
                const patientsRecord = patientsData.reduce((acc: Record<string, Patient>, patient: Patient) => {
                    acc[patient.id] = {
                        ...patient,
                        status: 'warning' // Default status, will be updated when sleep data is fetched
                    };
                    return acc;
                }, {});
                setPatients(patientsRecord);

                // Fetch notifications
                const notificationsResponse = await fetch('http://localhost:3001/api/notifications');
                if (!notificationsResponse.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const notificationsData = await notificationsResponse.json();
                setNotifications(notificationsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCloseNotification = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/api/notifications/${id}`, {
                method: 'DELETE'
            });
            setNotifications(notifications.filter(notif => notif.id !== id));
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    if (isLoading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="notification-panel">
            <h2>Notifications</h2>
            <div className="notification-cards">
                {notifications.map(notification => {
                    const patient = patients[notification.patient_id];
                    if (!patient) return null; // Skip if patient not found
                    
                    return (
                        <NotificationCard
                            key={notification.id}
                            title={notification.title}
                            patientId={notification.patient_id}
                            patientName={patient.name}
                            patientRoom={patient.room_number}
                            patientStatus={patient.status}
                            time={new Date(notification.time).toLocaleString()}
                            onClose={() => handleCloseNotification(notification.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationPanel;
