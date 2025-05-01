import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PatientPage.css';
import InfoBar from '../components/InfoBar';
import PatientCard from '../components/PatientCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import SleepScore from '../components/SleepScore';
import DailyList from '../components/DailyList';

interface PatientInfo {
    name: string;
    patientId: string;
    roomNumber: string;
    status: 'urgent' | 'warning' | 'stable';
}

interface SleepData {
    date: string;
    satisfactory_sleep: number;
    total_sleep: number;
}

const PatientPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { patientId } = useParams();
    const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
    const [sleepData, setSleepData] = useState<SleepData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (location.state) {
            setPatientInfo(location.state as PatientInfo);
        } else {
            navigate('/dashboard');
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchSleepData = async () => {
            if (!patientId) return;
            
            try {
                const response = await fetch(`http://localhost:3001/api/patients/${patientId}/sleep`);
                if (!response.ok) {
                    throw new Error('Failed to fetch sleep data');
                }
                const data = await response.json();
                setSleepData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load sleep data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSleepData();
    }, [patientId]);

    const handleDelete = async (id: string) => {
        try {
            console.log('Attempting to delete patient with ID:', id);
            const response = await fetch(`http://localhost:3001/api/patients/${id}`, {
                method: 'DELETE',
            });

            console.log('Delete response status:', response.status);
            const responseData = await response.json();
            console.log('Delete response data:', responseData);

            if (!response.ok) {
                throw new Error(`Failed to delete patient: ${response.status} ${JSON.stringify(responseData)}`);
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    if (!patientInfo) {
        return <div>Loading...</div>;
    }

    if (isLoading) {
        return <div>Loading sleep data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Calculate average sleep score from (up to) last 7 entries
    const calculateAverageSleepScore = () => {
        const lastSevenEntries = sleepData.slice(0, 7);
        if (lastSevenEntries.length === 0) return 0;

        const totalScore = lastSevenEntries.reduce((sum: number, entry: SleepData) => {
            const score = (entry.satisfactory_sleep / entry.total_sleep) * 100;
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
                    id={patientInfo.patientId}
                    name={patientInfo.name}
                    patientId={patientInfo.patientId}
                    roomNumber={patientInfo.roomNumber}
                    status={patientInfo.status}
                    onDelete={handleDelete}
                />
            </div>
            <div className="patient-content">
                <div className="left-column">
                    <SleepScore score={averageSleepScore} />
                </div>
                <div className="right-column">
                    <DailyList items={sleepData.map(entry => ({
                        date: entry.date,
                        satisfactorySleep: entry.satisfactory_sleep,
                        totalSleep: entry.total_sleep
                    }))} />
                </div>
            </div>
        </div>
    );
};

export default PatientPage;
