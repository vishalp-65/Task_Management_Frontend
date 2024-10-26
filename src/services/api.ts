// src/services/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Error handling utility
export const catchAsync = async (fn: Function, ...args: any[]) => {
    try {
        return await fn(...args);
    } catch (error: any) {
        throw error.response?.data?.message || "An unexpected error occurred";
    }
};

export default api;
