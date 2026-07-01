"use server";

import { api } from "@/lib/axios";
import { LoginResponse, RegisterResponse, User } from "@/types/authTypes";
import { cookies } from "next/headers";

export async function login(email: string, password: string) {
    try {
        const { data } = await api.post<LoginResponse>("/auth/login", {
            email,
            password,
        });

        const cookieStore = await cookies();
        if (data.success) {
            cookieStore.set("sportsync_token", data.data.token);
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
    const cookieStore = await cookies();
    cookieStore.set("sportsync_token", "");
};

export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("sportsync_token")?.value;
        if (!token) {
            console.log("No token found");
            return null;
        }
        const { data } = await api.get<RegisterResponse>("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        console.log(token);
        return data?.data;
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
}

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
