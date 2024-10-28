// src/store/authStore.ts
import { create } from "zustand";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUser, loginUser } from "@/services/auth.service";
import { getToken } from "@/config/env_config";
import { localStorageConstant } from "@/constant/constant";

export interface AuthState {
    user: any | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: getToken(), // Initialize token from local storage
    isLoading: false,
    error: null,
    login: async (email, password) => {
        try {
            set({ isLoading: true, error: null });
            const res = await loginUser(email, password);
            console.log("response", res);
            const { user, token } = res.data;
            localStorage.setItem(localStorageConstant.JWT_TOKEN, token);
            set({ user, token, isLoading: false });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem(localStorageConstant.JWT_TOKEN);
        set({ user: null, token: null });
    },
    checkAuthStatus: async () => {
        const token = getToken();
        if (!token) {
            // Redirect to login if no token is found
            set({ user: null, token: null });
            return;
        }

        try {
            set({ isLoading: true });
            const res = await fetchUser();
            const user = res.data;
            set({ user, token, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },
}));

export const useProtectedRoute = (allowedRoles: string[]) => {
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (user && !allowedRoles.includes(user.role)) {
            router.replace("/");
        } else if (!user) {
            router.replace("/auth/login"); // Redirect to login if no user
        }
    }, [user, allowedRoles, router]);
};
