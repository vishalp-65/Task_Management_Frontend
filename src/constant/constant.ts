export const localStorageConstant = {
    JWT_TOKEN: "jwt_token" as string,
};

export const TaskTypesItems = [
    { value: "all", label: "All", imgPath: "/svg/search.svg" },
    { value: "your", label: "Your" },
    { value: "team", label: "Team" },
    { value: "delegated", label: "Delegated" },
];

export const SelectItemForNewTask = [
    { value: "general", label: "General", imgPath: "/svg/info.svg" },
    { value: "brand", label: "Brand", imgPath: "/svg/brand-tag.svg" },
    { value: "event", label: "Event", imgPath: "/svg/event.svg" },
    { value: "inventory", label: "Inventory", imgPath: "/svg/people-tag.svg" },
];

export const TimeFrames = [
    { value: "today", label: "Toady" },
    { value: "last3days", label: "Last 3 days" },
    { value: "last7days", label: "Last week" },
    { value: "last15days", label: "Last 15 days" },
    { value: "lastmonth", label: "Last month" },
    { value: "thismonth", label: "This month" },
    { value: "alltime", label: "All time" },
];

// Default data for the pie chart
export const defaultDataForChart = [
    { label: "A", value: 60, name: "General Service", color: "#78E7F0" },
    { label: "B", value: 10, name: "Brand Related", color: "#07747D" },
    { label: "C", value: 13, name: "Event Related", color: "#09949F" },
    { label: "D", value: 5, name: "Inventory Related", color: "#38C6D2" },
];

export const sortByValues = [
    {
        label: "Alphabetical Order (A-Z)",
        orderBy: "asc",
        sortBy: "title",
    },
    {
        label: "Alphabetical Order (Z-A)",
        orderBy: "desc",
        sortBy: "title",
    },
    {
        label: "Due Date (Soonest First)",
        orderBy: "asc",
        sortBy: "due_date",
    },
    {
        label: "Due Date (Farthest First)",
        orderBy: "desc",
        sortBy: "due_date",
    },
    {
        label: "Newest Created",
        orderBy: "desc",
        sortBy: "created_at",
    },
    {
        label: "Oldest Created",
        orderBy: "asc",
        sortBy: "created_at",
    },
];

export const categories = [
    { label: "All", value: "all" },
    { label: "General Service", value: "general" },
    { label: "Brand", value: "brand" },
    { label: "Event", value: "event" },
    { label: "Inventory", value: "inventory" },
];
