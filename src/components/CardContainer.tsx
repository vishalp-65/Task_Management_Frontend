// src/components/task/TaskContainer.tsx

import React from "react";
import Tasks from "./task/Tasks";

interface TaskContainerProps {
    activeTab: string;
}

const CardContainer: React.FC<TaskContainerProps> = ({ activeTab }) => {
    let content;

    switch (activeTab) {
        case "tasks":
            content = <Tasks />;
            break;
        default:
            content = (
                <div className="flex items-center justify-center h-full w-full text-2xl">
                    {activeTab} data
                </div>
            );
    }

    return (
        <div className="bg-taskContainer_dark rounded-xl mb-2 mt-1 mr-3 h-full overflow-y-auto">
            {content}
        </div>
    );
};

export default CardContainer;
