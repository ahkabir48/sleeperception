import React, { useState } from 'react';
import './PatientCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeletePatientDialog from './DeletePatientDialog';

interface PatientCardProps {
    id: string;
    name: string;
    patientId: string;
    roomNumber: string;
    status: 'urgent' | 'warning' | 'stable';
    onDelete: (id: string) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ 
    id, 
    name, 
    patientId, 
    roomNumber, 
    status,
    onDelete 
}) => {
    const navigate = useNavigate();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handlePatientClick = (patientId: string) => {
        navigate(`/patient/${patientId}`, {
            state: {
                name: name,
                patientId: patientId,
                roomNumber: roomNumber,
                status: status
            }
        });
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await onDelete(id);
            setIsDeleteDialogOpen(false);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

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
        <>
            <div className="patient-card" onClick={() => handlePatientClick(patientId)}>
                <div className="patient-info">
                    <h3 className="patient-name">{name}</h3>
                    <div className="patient-details">
                        <span>ID: {patientId}</span>
                        <span>Room: {roomNumber}</span>
                    </div>
                </div>
                <div className="patient-actions">
                    {getStatusIndicator()}
                    <button 
                        className="delete-button"
                        onClick={handleDeleteClick}
                        title="Delete patient"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>

            <DeletePatientDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                patientName={name}
            />
        </>
    );
};

export default PatientCard;
