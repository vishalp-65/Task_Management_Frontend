import { fetchAnalytics } from "@/services/analytics.service";
import { create } from "zustand";

export interface AnalyticState {
    isLoading: boolean;
    error: string | null;
    totalTasksCreated: number;
    openTasks: number;
    completedTasks: number;
    overdueTasks: number;
    inventoryTasksCount: number;
    eventTasksCount: number;
    brandTasksCount: number;
    generalTasksCount: number;
    fetchAnalyticsState: (
        timeframe:
            | "today"
            | "last3days"
            | "last7days"
            | "last15days"
            | "lastmonth"
            | "thismonth"
            | "alltime"
    ) => Promise<boolean>;
}

export const useAnalyticsStore = create<AnalyticState>((set) => ({
    totalTasksCreated: 0,
    openTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
    isLoading: false,
    error: null,
    inventoryTasksCount: 0,
    eventTasksCount: 0,
    brandTasksCount: 0,
    generalTasksCount: 0,

    fetchAnalyticsState: async (timeframe) => {
        set({ isLoading: true });
        try {
            const res = await fetchAnalytics(timeframe);
            const analyticsData = res.data;
            set({
                totalTasksCreated: analyticsData.totalTasksCreated,
                openTasks: analyticsData.openTasks,
                completedTasks: analyticsData.completedTasks,
                overdueTasks: analyticsData.overdueTasks,
                inventoryTasksCount: analyticsData.inventoryTasksCount,
                eventTasksCount: analyticsData.eventTasksCount,
                brandTasksCount: analyticsData.brandTasksCount,
                generalTasksCount: analyticsData.generalTasksCount,
                isLoading: false,
            });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
}));
