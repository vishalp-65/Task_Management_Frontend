// src/store/authStore.ts
import { create } from "zustand";
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
    token: getToken(),
    isLoading: true, // Set to true initially to wait for auth check
    error: null,

    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const res = await loginUser(email, password);
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
            set({ user: null, token: null, isLoading: false });
            return;
        }

        set({ isLoading: true });
        try {
            const res = await fetchUser();
            set({ user: res.data, token, isLoading: false });
        } catch (err: any) {
            set({
                error: err.message,
                user: null,
                token: null,
                isLoading: false,
            });
        }
    },
}));
