// src/store/taskStore.ts
import {
    fetchAllUsers,
    fetchBrands,
    fetchEvents,
    fetchInventories,
    fetchTeamUsers,
} from "@/services/filter.service";
import { create } from "zustand";

export interface UserState {
    isLoading: boolean;
    error: string | null;
    allUsers: any | null;
    teamUser: any | null;
    brands: any | null;
    inventories: any | null;
    events: any | null;
    fetchTeamUsers: () => Promise<any>;
    fetchAllUsers: () => Promise<any>;
    fetchBrands: () => Promise<any>;
    fetchInventories: () => Promise<any>;
    fetchEvents: () => Promise<any>;
}

export const useUserStore = create<UserState>((set) => ({
    isLoading: false,
    error: null,
    allUsers: null,
    teamUser: null,
    brands: null,
    inventories: null,
    events: null,

    fetchAllUsers: async () => {
        set({ isLoading: true });
        try {
            const res = await fetchAllUsers();
            set(() => ({
                allUsers: res.data,
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },

    fetchTeamUsers: async () => {
        set({ isLoading: true });
        try {
            const res = await fetchTeamUsers();
            console.log("res team", res.data);
            set(() => ({
                teamUser: res.data,
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
    fetchBrands: async () => {
        set({ isLoading: true });
        try {
            const res = await fetchBrands();
            console.log("res brands", res.data);
            set(() => ({
                brands: res.data,
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
    fetchInventories: async () => {
        set({ isLoading: true });
        try {
            const res = await fetchInventories();
            console.log("res inventory", res.data);
            set(() => ({
                inventories: res.data,
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
    fetchEvents: async () => {
        set({ isLoading: true });
        try {
            const res = await fetchEvents();
            console.log("res events", res.data);
            set(() => ({
                events: res.data,
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
}));
