// Define User type
export interface User {
    id: string;
    user_name: string;
    password: string;
    phone_number: string;
    email: string;
    isDefaultPassword: boolean;
    created_at: string;
    updated_at: string;
}

// Define Task History entry type
export interface TaskHistory {
    id: string;
    action: string;
    timestamp: string;
    performed_by: User;
}
export interface Brand {
    id: string;
    brandName: string;
}
export interface Inventory {
    id: string;
    inventoryName: string;
}
export interface Event {
    id: string;
    eventName: string;
}

// Define Task type
export interface Task {
    id: string;
    title: string;
    description: string;
    task_type: "general" | "brand" | "event" | "inventory";
    due_date: string;
    status: "open" | "completed" | "in-progress" | "overdue";
    created_at: string;
    updated_at: string;
    creator: User;
    assignee: User;
    brand: Brand;
    event: Event;
    inventory: Inventory;
    history: TaskHistory[];
}
