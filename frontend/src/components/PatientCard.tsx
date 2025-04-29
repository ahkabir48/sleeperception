import React from 'react';
import './PatientCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface PatientCardProps {
    name: string;
    patientId: string;
    roomNumber: string;
    status: 'urgent' | 'warning' | 'stable';
}

const PatientCard: React.FC<PatientCardProps> = ({ name, patientId, roomNumber, status }) => {
    const getStatusIndicator = () => {
        switch (status) {
            case 'urgent':
                return <div className="status-indicator status-critical">!!!</div>;
            case 'warning':
                return <div className="status-indicator status-warning">!!</div>;
            case 'stable':
                return <div className="status-indicator status-stable">
                    <FontAwesomeIcon icon={faCheck} />
                </div>;
        }
    };

    return (
        <div className="patient-card">
            <div className="patient-info">
                <h3 className="patient-name">{name}</h3>
                <div className="patient-details">
                    <span>ID: {patientId}</span>
                    <span>Room: {roomNumber}</span>
                </div>
            </div>
            {getStatusIndicator()}
        </div>
    );
};

export default PatientCard;
