import { sidebarIcons } from "@/constant/sideBarIcons";
import Image from "next/image";
import React from "react";

const SideBar = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                {sidebarIcons.map((icons, indx) => (
                    <div
                        key={indx}
                        className="w-9 h-9 rounded-full mb-1 bg-gray-800 flex items-center justify-center cursor-pointer"
                    >
                        <Image
                            src={icons.icon}
                            alt={icons.name}
                            width={10}
                            height={10}
                            className="w-6 h-6 fill-white"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
