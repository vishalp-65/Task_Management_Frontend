import React from "react";
import SideBar from "./SideBar";
import TaskContainer from "./task/TaskContainer";

const DashboardContainer = () => {
    return (
        <div className="flex h-full w-full items-center">
            <div className="basis-[5%]">
                <SideBar />
            </div>
            <div
                style={{ height: "calc(100vh - 6rem)" }}
                className="basis-[95%] bg-gra"
            >
                <TaskContainer />
            </div>
        </div>
    );
};

export default DashboardContainer;
