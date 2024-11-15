// src/store/taskStore.ts
import { NewTaskData } from "@/components/task/newTask/AddNewTaskModal";
import { createTask, deleteTask, fetchTasks } from "@/services/task.service";
import { Task } from "@/types/types";
import { create } from "zustand";

export interface TaskState {
    tasks: Task[];
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
    }) => Promise<any>;
    addTask: (taskData: NewTaskData) => Promise<boolean>;

    deleteTask: (taskId: string) => Promise<boolean>;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
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
            return res.data.tasks;
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
            return err;
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
        set({ isLoading: true, error: null });
        try {
            await deleteTask(taskId);
            set({ isLoading: false });
            return true;
        } catch (err: any) {
            const errorMessage = err || "Failed to delete task";
            set({ error: errorMessage, isLoading: false });
            return errorMessage;
        }
    },
}));
