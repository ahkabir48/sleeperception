import React, { useState } from 'react';
import './PatientList.css';
import PatientCard from './PatientCard';

const PatientList = () => {
    const [patients, setPatients] = useState([
        { name: 'John Doe', patientId: '12345', roomNumber: '1', status: 'stable' },
        { name: 'Jane Smith', patientId: '67890', roomNumber: '2', status: 'warning' },
        { name: 'John Doe', patientId: '12345', roomNumber: '1', status: 'urgent' },
        { name: 'Jane Smith', patientId: '67890', roomNumber: '2', status: 'warning' },
        { name: 'John Doe', patientId: '12345', roomNumber: '1', status: 'stable' },
        { name: 'Jane Smith', patientId: '67890', roomNumber: '2', status: 'urgent' },
        // Add more patients as needed
    ]);
    return (
        <div className="patient-cards">
            <div className="patient-cards-header">
                <h2>Patient List</h2>
                <div className="patient-cards-header-right">
                    <select className="patient-cards-ward-select">
                        <option value="A">Ward A</option>
                        <option value="B">Ward B</option>
                        <option value="C">Ward C</option>
                    </select>
                    <button className="patient-cards-add-patient">Add Patient</button>
                </div>
            </div>
            <div className="patient-cards-container">
                {patients.map((patient) => (
                    <PatientCard
                        key={patient.patientId}
                        name={patient.name}
                        patientId={patient.patientId}
                        roomNumber={patient.roomNumber}
                        status={patient.status as 'stable' | 'warning' | 'urgent'}
                    />
                ))}
            </div>
        </div>
    );
};

export default PatientList;
