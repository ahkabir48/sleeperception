import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PatientPage.css';
import InfoBar from '../components/InfoBar';
import PatientCard from '../components/PatientCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SleepScore from '../components/SleepScore';
import DailyList from '../components/DailyList';

const PatientPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // If no state, redirect back to dashboard
    if (!location.state) {
        navigate('/dashboard');
        return null;
    }

    const patientData = location.state;

    return (
        <div className="patient-page">
            <InfoBar />
            <div className="patient-header">
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <PatientCard 
                    name={patientData.name}
                    patientId={patientData.patientId}
                    roomNumber={patientData.roomNumber}
                    status={patientData.status}
                />
            </div>
            <div className="patient-content">
                <SleepScore />
                <DailyList />
            </div>
        </div>
    );
};

export default PatientPage;
