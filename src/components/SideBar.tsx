import { sidebarIcons } from "@/constant/sideBarIcons";
import Image from "next/image";
import React from "react";

type Props = {};

const SideBar = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                {sidebarIcons.map((icons) => (
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                        <Image
                            src={icons.icon}
                            alt={icons.name}
                            width={10}
                            height={10}
                            className="w-5 h-5"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
