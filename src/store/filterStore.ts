// src/store/filterStore.ts
import { create } from "zustand";
import {
    fetchAllUsers,
    fetchBrands,
    fetchEvents,
    fetchInventories,
    fetchTeamUsers,
} from "@/services/filter.service";

interface UserState {
    isLoading: boolean;
    error: string | null;
    allUsers: any[] | null;
    teamUser: any[] | null;
    brands: any[] | null;
    inventories: any[] | null;
    events: any[] | null;
    fetchAllData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    isLoading: false,
    error: null,
    allUsers: null,
    teamUser: null,
    brands: null,
    inventories: null,
    events: null,

    fetchAllData: async () => {
        set({ isLoading: true });
        try {
            const [users, teams, brands, inventories, events] =
                await Promise.all([
                    fetchAllUsers(),
                    fetchTeamUsers(),
                    fetchBrands(),
                    fetchInventories(),
                    fetchEvents(),
                ]);

            set({
                allUsers: users.data,
                teamUser: teams.data,
                brands: brands.data,
                inventories: inventories.data,
                events: events.data,
                isLoading: false,
            });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },
}));
