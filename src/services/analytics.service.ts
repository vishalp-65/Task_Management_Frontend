// src/services/taskService.ts
import apiClient from "@/api/api";

export const fetchAnalytics = async (
    timeframe:
        | "today"
        | "last3days"
        | "last7days"
        | "last15days"
        | "lastmonth"
        | "thismonth"
        | "alltime"
) => {
    return await apiClient.get<{ data: any }>(
        `analytics?timeframe=${timeframe}`
    );
};
