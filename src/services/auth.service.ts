// src/services/authService.ts
import apiClient from "./api";

export const loginUser = async (email: string, password: string) => {
    return await apiClient.post<{ data: any }>("auth/login", {
        email,
        password,
    });
};

export const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: string
) => {
    return await apiClient.post<{ user: any; token: string }>("auth/register", {
        name,
        email,
        password,
        role,
    });
};

export const fetchUser = async () => {
    return await apiClient.get<{ data: any }>("auth");
};
