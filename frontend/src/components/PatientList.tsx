import React, { useState, useEffect } from 'react';
import './PatientList.css';
import PatientCard from './PatientCard';
import AddPatientDialog from './AddPatientDialog';

interface Patient {
    id: string;
    name: string;
    roomNumber: string;
    status: 'stable' | 'warning' | 'urgent';
}

const PatientList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            console.log('Fetching patients from API...');
            const response = await fetch('http://localhost:3001/api/patients');
            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error response:', errorText);
                throw new Error(`Failed to fetch patients: ${response.status} ${errorText}`);
            }
            
            const patients = await response.json();
            console.log('Received patient data:', patients);

            // Fetch sleep data for each patient and calculate status
            const patientsWithStatus = await Promise.all(patients.map(async (patient: any) => {
                try {
                    const sleepResponse = await fetch(`http://localhost:3001/api/patients/${patient.id}/sleep`);
                    if (!sleepResponse.ok) {
                        return {
                            ...patient,
                            roomNumber: patient.room_number,
                            status: 'warning' // Default status if sleep data fetch fails
                        };
                    }

                    const sleepData = await sleepResponse.json();
                    
                    // Calculate status based on sleep data
                    let status: 'stable' | 'warning' | 'urgent' = 'warning';
                    
                    if (sleepData && sleepData.length > 0) {
                        const lastSevenEntries = sleepData.slice(0, 7);
                        const totalScore = lastSevenEntries.reduce((sum: number, entry: any) => {
                            const score = (entry.satisfactory_sleep / entry.total_sleep) * 100;
                            return sum + score;
                        }, 0);
                        
                        const averageScore = totalScore / lastSevenEntries.length;
                        
                        if (averageScore >= 75) status = 'stable';
                        else if (averageScore >= 50) status = 'warning';
                        else status = 'urgent';
                    }

                    return {
                        ...patient,
                        roomNumber: patient.room_number,
                        status
                    };
                } catch (error) {
                    console.error(`Error fetching sleep data for patient ${patient.id}:`, error);
                    return {
                        ...patient,
                        roomNumber: patient.room_number,
                        status: 'warning'
                    };
                }
            }));

            setPatients(patientsWithStatus);
        } catch (err) {
            console.error('Detailed fetch error:', err);
            setError(`Failed to load patients: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddPatient = async (name: string, roomNumber: string) => {
        try {
            const response = await fetch('http://localhost:3001/api/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, room_number: roomNumber }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error response:', errorText);
                throw new Error(`Failed to add patient: ${response.status} ${errorText}`);
            }

            const newPatient = await response.json();
            // Add the new patient to the list with default 'warning' status
            setPatients(prevPatients => [
                ...prevPatients,
                {
                    ...newPatient,
                    roomNumber: newPatient.room_number,
                    status: 'warning'
                }
            ]);
        } catch (error) {
            console.error('Error adding patient:', error);
            throw error;
        }
    };

    const handleDeletePatient = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/patients/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error response:', errorText);
                throw new Error(`Failed to delete patient: ${response.status} ${errorText}`);
            }

            // Remove the patient from the local state
            setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
            throw error;
        }
    };

    // Sort patients by status priority and room number
    const sortedPatients = [...patients].sort((a, b) => {
        // First sort by status priority
        const statusPriority = {
            'urgent': 0,
            'warning': 1,
            'stable': 2
        };
        const statusDiff = statusPriority[a.status] - statusPriority[b.status];
        if (statusDiff !== 0) return statusDiff;
        
        // If status is the same, sort by room number
        return parseInt(a.roomNumber) - parseInt(b.roomNumber);
    });

    if (isLoading) {
        return <div>Loading patients...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="patient-cards">
            <div className="patient-cards-header">
                <h2>Patient List</h2>
                <div className="patient-cards-header-right">
                    <button 
                        className="patient-cards-add-patient"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Add Patient
                    </button>
                </div>
            </div>
            <div className="patient-cards-container">
                {sortedPatients.map(patient => (
                    <PatientCard
                        key={patient.id}
                        id={patient.id}
                        name={patient.name}
                        patientId={patient.id}
                        roomNumber={patient.roomNumber}
                        status={patient.status}
                        onDelete={handleDeletePatient}
                    />
                ))}
            </div>

            <AddPatientDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onAddPatient={handleAddPatient}
            />
        </div>
    );
};

export default PatientList;
