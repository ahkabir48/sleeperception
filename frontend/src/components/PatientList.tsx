import React from 'react';
import './PatientList.css';
import PatientCard from './PatientCard';
import { patientData } from '../data/patients';
import { patientSleepData } from '../data/patients';

// Function to calculate status based on sleep score
const calculateStatusFromSleepScore = (patientId: string): 'stable' | 'warning' | 'urgent' => {
    const patientData = patientSleepData[patientId];
    if (!patientData || patientData.dailyEvents.length === 0) return 'warning';

    const lastSevenEntries = patientData.dailyEvents.slice(0, 7);
    const totalScore = lastSevenEntries.reduce((sum: number, entry: { satisfactorySleep: number; totalSleep: number }) => {
        const score = (entry.satisfactorySleep / entry.totalSleep) * 100;
        return sum + score;
    }, 0);
    
    const averageScore = totalScore / lastSevenEntries.length;
    
    if (averageScore >= 75) return 'stable';
    if (averageScore >= 50) return 'warning';
    return 'urgent';
};

// Function to get status priority for sorting
const getStatusPriority = (status: 'stable' | 'warning' | 'urgent'): number => {
    switch (status) {
        case 'urgent': return 0;
        case 'warning': return 1;
        case 'stable': return 2;
    }
};

const PatientList = () => {
    // Sort patients by status priority and room number
    const sortedPatients = Object.entries(patientData)
        .map(([patientId, patient]) => ({
            ...patient,
            patientId,
            status: calculateStatusFromSleepScore(patientId)
        }))
        .sort((a, b) => {
            // First sort by status priority
            const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
            if (statusDiff !== 0) return statusDiff;
            
            // If status is the same, sort by room number
            return parseInt(a.roomNumber) - parseInt(b.roomNumber);
        });

    return (
        <div className="patient-cards">
            <div className="patient-cards-header">
                <h2>Patient List</h2>
                <div className="patient-cards-header-right">
                    {/* <select className="patient-cards-ward-select">
                        <option value="A">Ward A</option>
                        <option value="B">Ward B</option>
                        <option value="C">Ward C</option>
                    </select> */}
                    <button className="patient-cards-add-patient">Add Patient</button>
                </div>
            </div>
            <div className="patient-cards-container">
                {sortedPatients.map(patient => (
                    <PatientCard
                        key={patient.patientId}
                        name={patient.name}
                        patientId={patient.patientId}
                        roomNumber={patient.roomNumber}
                        status={patient.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default PatientList;
