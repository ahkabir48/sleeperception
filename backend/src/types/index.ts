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