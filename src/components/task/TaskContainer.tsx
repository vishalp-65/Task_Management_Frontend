import React from "react";
import TaskCard from "./TaskCard";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/types";
import { capitalizeFirstLetter } from "@/util/helper";

type Props = {
    currentTaskStatus: "open" | "completed";
};

const TaskContainer: React.FC<Props> = ({ currentTaskStatus }) => {
    const { tasks, isLoading } = useTaskStore();

    return (
        <div className="">
            <p className="text-xl font-semibold font-serif mb-2 ml-2">
                {capitalizeFirstLetter(currentTaskStatus)} tasks
            </p>

            <div className="flex flex-wrap items-center">
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        Loading tasks...
                    </div>
                ) : tasks && tasks.length > 0 ? (
                    tasks.map((task: Task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
        </div>
    );
};

export default TaskContainer;
