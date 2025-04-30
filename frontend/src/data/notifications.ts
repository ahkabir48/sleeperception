interface Notification {
    id: number;
    title: string;
    patientId: string;
    time: string;
}

export const notificationData: Notification[] = [
    { 
        id: 1, 
        title: 'New Patient Admitted', 
        patientId: '12345',
        time: '2 hours ago' 
    },
    { 
        id: 2, 
        title: 'Sleep Pattern Alert', 
        patientId: '67890',
        time: '1 hour ago' 
    }
]; 