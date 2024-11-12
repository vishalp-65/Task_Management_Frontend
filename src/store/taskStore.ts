// src/store/taskStore.ts
import { createTask, deleteTask, fetchTasks } from "@/services/task.service";
import { Task } from "@/types/types";
import { create } from "zustand";

export interface TaskState {
    tasks: Task[] | null;
    totalTasks: number;
    isLoading: boolean;
    error: string | null;
    fetchTaskList: (filters?: {
        sortBy?: string;
        assignedTo?: string;
        assignedBy?: string;
        taskType?: string;
        dueDate?: string;
        page?: number;
        limit?: number;
        order?: string;
        status?: string;
    }) => Promise<boolean>;
    addTask: (taskData: {
        title: string;
        description: string;
        task_type: string;
        due_date: string;
        assigneeId: string;
    }) => Promise<boolean>;

    deleteTask: (taskId: string) => Promise<any>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: null,
    totalTasks: 0,
    isLoading: false,
    error: null,

    fetchTaskList: async (filters = {}) => {
        set({ isLoading: true });
        try {
            const res = await fetchTasks(filters);
            set({
                tasks: res.data.tasks,
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
                tasks: state.tasks ? [res.data, ...state.tasks] : [res.data],
                isLoading: false,
            }));
            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
    deleteTask: async (taskId: string) => {
        set({ isLoading: true });
        try {
            await deleteTask(taskId);

            return true;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return false;
        }
    },
}));
