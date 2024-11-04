// src/components/task/TaskContainer.tsx

import React from "react";
import TaskNavbar from "./TaskNavbar";
import Analytics from "./Analytics";

const Tasks = () => {
    return (
        <div className="space-y-2">
            <TaskNavbar />
            <Analytics />
        </div>
    );
};

export default Tasks;
