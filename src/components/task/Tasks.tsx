// src/components/task/Tasks.tsx
"use client";
import React, { useEffect, useState } from "react";
import TaskNavbar from "./TaskNavbar";
import Analytics from "./Analytics";
import TaskContainer from "./TaskContainer";
import { useTaskStore } from "@/store/taskStore";

const Tasks = () => {
    const { fetchTaskList, totalTasks, isLoading } = useTaskStore();
    const [currentTaskStatus, setCurrentTaskStatus] = useState<
        "open" | "completed"
    >("open");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 10; // Limit of tasks per page

    // Fetch tasks for the current page with filters
    useEffect(() => {
        fetchTaskList({ page: currentPage, limit: tasksPerPage });
    }, [fetchTaskList, currentPage]);

    const totalPages = Math.ceil(totalTasks / tasksPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleTaskStatusChange = (status: "open" | "completed") => {
        setCurrentTaskStatus(status);
        fetchTaskList({ status: status });
    };

    // const handleSortChange = (newSortBy: string) => {
    //     setSortBy(newSortBy);
    //     setCurrentPage(1); // Reset to first page on new sort
    // };

    return (
        <div className="">
            <TaskNavbar
                currentTaskStatus={currentTaskStatus}
                handleTaskStatusChange={handleTaskStatusChange}
            />
            <Analytics />
            <div className="mt-5 ml-2">
                {isLoading ? (
                    <p>Loading tasks...</p>
                ) : (
                    <TaskContainer currentTaskStatus={currentTaskStatus} />
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center my-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-3 h-3 flex items-center justify-center m-1 p-3 rounded-full ${
                                currentPage === index + 1
                                    ? "bg-blue text-white"
                                    : "bg-gray-300 text-black"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tasks;
