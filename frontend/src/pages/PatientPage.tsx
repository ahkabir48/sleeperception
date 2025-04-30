import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PatientPage.css';
import InfoBar from '../components/InfoBar';
import PatientCard from '../components/PatientCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SleepScore from '../components/SleepScore';
import DailyList from '../components/DailyList';
import { patientSleepData } from '../data/patients';

const PatientPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { patientId } = useParams();
    
    // If no state or patientId, redirect back to dashboard
    if (!location.state || !patientId) {
        navigate('/dashboard');
        return null;
    }

    const patientInfo = location.state;
    const sleepData = patientSleepData[patientId] || { dailyEvents: [] };

    // Calculate average sleep score from (up to) last 7 entries
    const calculateAverageSleepScore = () => {
        const lastSevenEntries = sleepData.dailyEvents.slice(0, 7);
        if (lastSevenEntries.length === 0) return 0;

        const totalScore = lastSevenEntries.reduce((sum: number, entry: { satisfactorySleep: number; totalSleep: number }) => {
            const score = (entry.satisfactorySleep / entry.totalSleep) * 100;
            return sum + score;
        }, 0);

        return Math.round(totalScore / lastSevenEntries.length);
    };

    const averageSleepScore = calculateAverageSleepScore();

    return (
        <div className="patient-page">
            <InfoBar />
            <div className="patient-header">
                <button className="back-button" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <PatientCard 
                    name={patientInfo.name}
                    patientId={patientInfo.patientId}
                    roomNumber={patientInfo.roomNumber}
                    status={patientInfo.status}
                />
            </div>
            <div className="patient-content">
                <div className="left-column">
                    <SleepScore score={averageSleepScore} />
                </div>
                <div className="right-column">
                    <DailyList items={sleepData.dailyEvents} />
                </div>
            </div>
        </div>
    );
};

export default PatientPage;
