// src/components/SideBar.tsx

import { sidebarIcons } from "@/constant/sideBarIcons";
import React from "react";
import IconWithButton from "./reusable/IconWithButton";

interface SideBarProps {
    activeTab: string;
    onTabChange: (tabName: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 h-full">
            {sidebarIcons.map((icon, index) => (
                <div
                    key={index}
                    onClick={() => onTabChange(icon.name)}
                    className={`w-11 h-11 flex items-center justify-center rounded-full cursor-pointer
                       ${
                           activeTab === icon.name
                               ? "bg-active_icon_bg"
                               : "bg-icon_bg"
                       }`}
                >
                    <IconWithButton
                        src={icon.icon}
                        alt={icon.name}
                        imageClassName={`transition-colors duration-200 ${
                            activeTab === icon.name
                                ? "filter brightness-0 w-5 h-5" // Black when active
                                : "filter invert brightness-0" // White when inactive
                        }`}
                    />
                </div>
            ))}
        </div>
    );
};

export default SideBar;
