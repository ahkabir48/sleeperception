interface Patient {
    name: string;
    roomNumber: string;
    status: 'stable' | 'warning' | 'urgent';
}

interface SleepData {
    dailyEvents: {
        date: string;
        satisfactorySleep: number;
        totalSleep: number;
    }[];
}

export const patientData: Record<string, Patient> = {
    '12345': {
        name: 'John Doe',
        roomNumber: '101',
        status: 'stable'
    },
    '67890': {
        name: 'Jane Smith',
        roomNumber: '102',
        status: 'warning'
    },
    '24680': {
        name: 'Michael Johnson',
        roomNumber: '103',
        status: 'stable'
    },
    '13579': {
        name: 'Sarah Williams',
        roomNumber: '104',
        status: 'urgent'
    }
};

export const patientSleepData: Record<string, SleepData> = {
    '12345': {
        dailyEvents: [
            { date: "2024-04-29", satisfactorySleep: 6.5, totalSleep: 8 },
            { date: "2024-04-28", satisfactorySleep: 5, totalSleep: 7 },
            { date: "2024-04-27", satisfactorySleep: 7, totalSleep: 8.5 }
        ]
    },
    '67890': {
        dailyEvents: [
            { date: "2024-04-29", satisfactorySleep: 4.5, totalSleep: 6 },
            { date: "2024-04-28", satisfactorySleep: 5.5, totalSleep: 7.5 },
            { date: "2024-04-27", satisfactorySleep: 6, totalSleep: 8 }
        ]
    },
    '24680': {
        dailyEvents: [
            { date: "2024-04-29", satisfactorySleep: 7.5, totalSleep: 8.5 },
            { date: "2024-04-28", satisfactorySleep: 7.2, totalSleep: 8 },
            { date: "2024-04-27", satisfactorySleep: 7.8, totalSleep: 8.2 },
            { date: "2024-04-26", satisfactorySleep: 7.3, totalSleep: 8 },
            { date: "2024-04-25", satisfactorySleep: 7.6, totalSleep: 8.3 },
            { date: "2024-04-24", satisfactorySleep: 7.4, totalSleep: 8.1 },
            { date: "2024-04-23", satisfactorySleep: 7.7, totalSleep: 8.4 }
        ]
    },
    '13579': {
        dailyEvents: [
            { date: "2024-04-29", satisfactorySleep: 1.5, totalSleep: 4.5 },
            { date: "2024-04-28", satisfactorySleep: 1.8, totalSleep: 5 },
            { date: "2024-04-27", satisfactorySleep: 1.6, totalSleep: 4.8 },
            { date: "2024-04-26", satisfactorySleep: 1.7, totalSleep: 5.2 },
            { date: "2024-04-25", satisfactorySleep: 1.4, totalSleep: 4.7 },
            { date: "2024-04-24", satisfactorySleep: 1.9, totalSleep: 5.1 },
            { date: "2024-04-23", satisfactorySleep: 1.5, totalSleep: 4.9 }
        ]
    }
}; 