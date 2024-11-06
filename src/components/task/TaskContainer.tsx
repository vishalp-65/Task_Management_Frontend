import React from "react";
import TaskCard from "./TaskCard";

const TaskContainer = () => {
    return (
        <div className="">
            <p className="text-xl font-semibold font-serif mb-2 ml-2">
                Open tasks
            </p>

            <div className="flex flex-wrap items-center">
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>
        </div>
    );
};

export default TaskContainer;
