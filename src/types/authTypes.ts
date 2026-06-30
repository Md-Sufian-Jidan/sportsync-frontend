export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "driver";
    created_at?: string;
    updated_at?: string;
}
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    }
}
export interface RegisterResponse {
    success: boolean;
    message: string;
    data: User;
}