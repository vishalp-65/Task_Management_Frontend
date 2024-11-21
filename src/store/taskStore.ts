// src/store/taskStore.ts
import { NewTaskData } from "@/components/task/newTask/AddNewTaskModal";
import {
    createTask,
    deleteTask,
    fetchTasks,
    markAsCompletedTask,
} from "@/services/task.service";
import { Task } from "@/types/types";
import { create } from "zustand";

interface filterType {
    sortBy?: string;
    assignedTo?: string;
    assignedBy?: string;
    taskType?: string;
    dueDate?: string;
    page?: number;
    limit?: number;
    order?: string;
    status?: string;
    taskName?: string;
    teamOwner?: string;
    // dueDatePassed?: boolean;
    brandName?: string;
    inventoryName?: string;
    eventName?: string;
}

export interface TaskState {
    tasks: Task[];
    totalTasks: number;
    isLoading: boolean;
    error: string | null;

    sortBy?: string;
    assignedTo?: string;
    assignedBy?: string;
    taskType?: string;
    dueDate?: string;
    page?: number;
    limit?: number;
    order?: string;
    status?: string;
    taskName?: string;
    teamOwner?: string;
    dueDatePassed?: boolean;
    brandName?: string;
    inventoryName?: string;
    eventName?: string;

    fetchTaskList: (filters?: filterType) => Promise<any>;
    addTask: (taskData: NewTaskData) => Promise<boolean>;

    deleteTask: (taskId: string) => Promise<boolean>;
    markAsCompletedTask: (
        taskId: string,
        data: { status: "open" | "in-progress" | "completed" | "overdue" }
    ) => Promise<boolean>;

    clearFilterValue: (filterValue: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    totalTasks: 0,
    isLoading: true,
    error: null,
    sortBy: "created_at",
    page: 1,
    limit: 10,
    order: "desc",

    fetchTaskList: async (filters = {}) => {
        // set({ isLoading: true });
        try {
            const res = await fetchTasks(filters);
            set((state) => ({
                tasks: res.data.tasks,
                totalTasks: res.data.total,
                isLoading: false,

                sortBy: filters.sortBy,
                assignedTo: state.assignedTo
                    ? `${state.assignedTo}, ${filters.assignedTo}`
                    : filters.assignedTo,
                assignedBy: state.assignedBy
                    ? `${state.assignedBy}, ${filters.assignedBy}`
                    : filters.assignedBy,
                taskType: filters.taskType,
                dueDate: filters.dueDate,
                page: filters.page,
                limit: filters.limit,
                order: filters.order,
                status: filters.status,
                taskName: filters.taskName,
                teamOwner: state.teamOwner
                    ? `${state.teamOwner}, ${filters.teamOwner}`
                    : filters.teamOwner,
                brandName: filters.brandName,
                inventoryName: filters.inventoryName,
                eventName: filters.eventName,
            }));
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
            const errorMessage = err || "Failed to delete task";
            set({ error: errorMessage, isLoading: false });
            return errorMessage;
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
    markAsCompletedTask: async (
        taskId: string,
        data: { status: "open" | "in-progress" | "completed" | "overdue" }
    ) => {
        set({ isLoading: true, error: null });
        try {
            await markAsCompletedTask(taskId, data);
            set({ isLoading: false });
            return true;
        } catch (err: any) {
            const errorMessage = err || "Failed to delete task";
            set({ error: errorMessage, isLoading: false });
            return errorMessage;
        }
    },
    clearFilterValue: (filterValue: string) => {
        if (filterValue === "assignedTo") {
            set({ assignedTo: "" });
        } else if (filterValue === "assignedBy") {
            set({ assignedBy: "" });
        } else if (filterValue === "teamOwner") {
            set({ teamOwner: "" });
        } else if (filterValue === "brandName") {
            set({ brandName: "" });
        } else if (filterValue === "inventoryName") {
            set({ inventoryName: "" });
        } else if (filterValue === "eventName") {
            set({ eventName: "" });
        }
    },
}));
