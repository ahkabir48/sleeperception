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

    // Temporary data for DailyList
    const dailyEvents = [
        { 
            date: "2024-04-29",
            satisfactorySleep: 6.5,
            totalSleep: 8
        },
        { 
            date: "2024-04-28",
            satisfactorySleep: 5,
            totalSleep: 7
        },
        { 
            date: "2024-04-27",
            satisfactorySleep: 7,
            totalSleep: 8.5
        }
    ];

    // Calculate average sleep score from (up to) last 7 entries
    const calculateAverageSleepScore = () => {
        const lastSevenEntries = dailyEvents.slice(0, 7); // Get last 7 entries
        if (lastSevenEntries.length === 0) return 0;

        const totalScore = lastSevenEntries.reduce((sum, entry) => {
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
                    name={patientData.name}
                    patientId={patientData.patientId}
                    roomNumber={patientData.roomNumber}
                    status={patientData.status}
                />
            </div>
            <div className="patient-content">
                <div className="left-column">
                    <SleepScore score={averageSleepScore} />
                </div>
                <div className="right-column">
                    <DailyList items={dailyEvents} />
                </div>
            </div>
        </div>
    );
};

export default PatientPage;
