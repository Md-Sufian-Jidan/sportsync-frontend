import { api } from "@/lib/axios";
import { LoginResponse, RegisterResponse, User } from "@/types/authTypes";

export async function login(email: string, password: string) {
    try {
        const { data } = await api.post<LoginResponse>("/auth/login", {
            email,
            password,
        });

        if (typeof window !== "undefined") {
            localStorage.setItem("sportsync_token", data.data.token);
        }

        return data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function register(name: string, email: string, password: string, role: string) {
    try {
        const { data } = await api.post<RegisterResponse>("/auth/register", {
            name,
            email,
            password,
            role,
        });
        return data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

export async function logout(): Promise<void> {
    if (typeof window !== "undefined") {
        localStorage.removeItem("sportsync_token");
        localStorage.removeItem("sportsync_user");
    }
};

export async function getCurrentUser(): Promise<User | null> {
    if (typeof window !== "undefined") {
        const userJson = localStorage.getItem("sportsync_user");
        if (userJson) {
            try {
                return JSON.parse(userJson) as User;
            } catch {
                return null;
            }
        }
    }
    return null;
};

export async function updateProfile(name: string, role: string) {
    try {
        const { data } = await api.post<LoginResponse>("/auth/update-profile", {
            name,
            role,
        });

        if (typeof window !== "undefined") {
            localStorage.setItem("sportsync_user", JSON.stringify(data.data.user));
        }

        return data;
    } catch (error) {
        console.error("Profile update failed:", error);
        throw error;
    }
};
