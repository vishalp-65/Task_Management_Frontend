// src/services/taskService.ts
import apiClient from "./api";

export const fetchTasks = async (filters: {
    sortBy?: string;
    assignedTo?: string;
    assignedBy?: string;
    taskType?: string;
    dueDatePassed?: number;
    order?: string;
    teamOwner?: string;
    page?: number;
    limit?: number;
}) => {
    const query = new URLSearchParams(
        filters as Record<string, string>
    ).toString();
    return await apiClient.get<{ data: any }>(`tasks?${query}`);
};

export const createTask = async (taskData: {
    title: string;
    description: string;
    task_type: string;
    due_date: string;
    assigneeId: string;
}) => {
    return await apiClient.post<{ data: any }>("tasks", taskData);
};
