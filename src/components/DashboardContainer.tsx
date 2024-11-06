// src/components/DashboardContainer.tsx

"use client";

import React, { useState } from "react";
import SideBar from "./SideBar";
import CardContainer from "./CardContainer";

const DashboardContainer = () => {
    const [activeTab, setActiveTab] = useState<string>("tasks"); // Default active tab

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className="flex h-full w-full">
            <div className="basis-[5%]">
                <SideBar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>

            {/* Card container */}
            <div
                style={{ height: "calc(100vh - 6rem)" }}
                className="basis-[95%]"
            >
                <CardContainer activeTab={activeTab} />
            </div>
        </div>
    );
};

export default DashboardContainer;
