import React from 'react';
import './NotificationCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface NotificationCardProps {
    title: string;
    patientId: string;
    time: string;
    onClose: () => void;
    onGo: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ title, patientId, time, onClose, onGo }) => {
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
            <button className="go-button" onClick={onGo}>
                Go <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
    );
};

export default NotificationCard;
