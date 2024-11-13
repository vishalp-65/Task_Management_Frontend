// src/services/taskService.ts
import apiClient from "@/api/api";

export const fetchAllUsers = async () => {
    return await apiClient.get<{ data: any }>("user");
};

export const fetchTeamUsers = async () => {
    return await apiClient.get<{ data: any }>("user/team");
};

export const fetchBrands = async () => {
    return await apiClient.get<{ data: any }>("brand");
};

export const fetchInventories = async () => {
    return await apiClient.get<{ data: any }>("inventory");
};

export const fetchEvents = async () => {
    return await apiClient.get<{ data: any }>("event");
};
