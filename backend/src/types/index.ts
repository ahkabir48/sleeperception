export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: number;
        username: string;
    };
    token: string;
    error?: string;
}

export interface CreatePatientRequest {
    name: string;
    room_number: string;
}

export interface Patient {
    id: string;
    name: string;
    room_number: string;
    created_at: string;
} 