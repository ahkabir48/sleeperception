import React from 'react';
import './NotificationCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface NotificationCardProps {
    title: string;
    patientId: string;
    patientName: string;
    patientRoom: string;
    patientStatus: 'urgent' | 'warning' | 'stable';
    time: string;
    onClose: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
    title, 
    patientId, 
    patientName,
    patientRoom,
    patientStatus,
    time, 
    onClose 
}) => {
    const navigate = useNavigate();

    const handleGoToPatient = () => {
        navigate(`/patient/${patientId}`, {
            state: {
                name: patientName,
                patientId: patientId,
                roomNumber: patientRoom,
                status: patientStatus
            }
        });
    };

    return (
        <div className="notification-card">
            <div className="notification-header">
                <div className="notification-title">
                    <FontAwesomeIcon icon={faCircleInfo} className="info-icon" />
                    <h3>{title}</h3>
                </div>
                <FontAwesomeIcon icon={faXmark} className="close-icon" onClick={onClose} />
            </div>
            <p>Patient ID: {patientId}</p>
            <span className="notification-time">{time}</span>
            <button className="go-button" onClick={handleGoToPatient}>
                Go <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
};

export default NotificationCard;
