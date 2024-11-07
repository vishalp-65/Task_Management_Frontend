// src/store/taskStore.ts
import { createTask, fetchTasks } from "@/services/task.service";
import { Task } from "@/types/types";
import { create } from "zustand";

export interface TaskState {
    tasks: Task[] | null; // Updated to Task[] instead of any[]
    totalTasks: number;
    isLoading: boolean;
    error: string | null;
    fetchTaskList: (filters?: {
        sortBy?: string;
        assignedTo?: string;
        assignedBy?: string;
        taskType?: string;
        dueDatePassed?: number;
        order?: string;
        status?: string;
        teamOwner?: string;
        page?: number;
        limit?: number;
    }) => Promise<boolean>;
    addTask: (taskData: {
        title: string;
        description: string;
        task_type: string;
        due_date: string;
        assigneeId: string;
    }) => Promise<boolean>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: null,
    totalTasks: 0,
    isLoading: false,
    error: null,

    fetchTaskList: async (filters) => {
        set({ isLoading: true });
        try {
            const res = await fetchTasks(filters || {});
            console.log("Fetched tasks", res.data.tasks);
            set({
                tasks: res.data.tasks, // Assuming res.data.tasks is of type Task[]
                totalTasks: res.data.total,
                isLoading: false,
            });
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },

    addTask: async (taskData) => {
        set({ isLoading: true });
        try {
            const res = await createTask(taskData);
            set((state) => ({
                tasks: state.tasks ? [res.data, ...state.tasks] : [res.data], // Assuming res.data is of type Task
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
}));
