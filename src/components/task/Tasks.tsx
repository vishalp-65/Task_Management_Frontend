// src/components/task/TaskContainer.tsx

import React from "react";
import TaskNavbar from "./TaskNavbar";
import Analytics from "./Analytics";
import TaskContainer from "./TaskContainer";

const Tasks = () => {
    return (
        <div className="">
            <TaskNavbar />
            <Analytics />
            <div className="mt-5 ml-2">
                <TaskContainer />
            </div>
        </div>
    );
};

export default Tasks;
