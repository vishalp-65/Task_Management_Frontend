// src/components/SideBar.tsx

import { sidebarIcons } from "@/constant/sideBarIcons";
import Image from "next/image";
import React from "react";

interface SideBarProps {
    activeTab: string;
    onTabChange: (tabName: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-1 p-4 h-full">
            {sidebarIcons.map((icon, index) => (
                <div
                    key={index}
                    onClick={() => onTabChange(icon.name)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
                       ${
                           activeTab === icon.name
                               ? "bg-yellow-200"
                               : "bg-gray-700"
                       }`}
                >
                    <Image
                        src={icon.icon}
                        alt={icon.name}
                        width={20}
                        height={20}
                        className={`transition-colors duration-200  ${
                            activeTab === icon.name
                                ? "filter brightness-0" // Black when active
                                : "filter invert brightness-0" // White when inactive
                        }`}
                    />
                </div>
            ))}
        </div>
    );
};

export default SideBar;
