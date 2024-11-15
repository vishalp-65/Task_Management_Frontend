// src/services/taskService.ts

import apiClient from "@/api/api";
import { NewTaskData } from "@/components/task/newTask/AddNewTaskModal";

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
    console.log("query is ", query);
    const res = await apiClient.get<{ data: any }>(`tasks?${query}`);
    console.log("res", res);
    return res;
};

export const createTask = async (taskData: NewTaskData) => {
    return await apiClient.post<{ data: any }>("tasks", taskData);
};

export const deleteTask = async (taskId: string) => {
    return await apiClient.delete<{ data: any }>(`tasks/${taskId}`);
};
