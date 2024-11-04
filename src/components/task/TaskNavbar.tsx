import React, { useState } from "react";
import { TaskTypesItems, TimeFrames } from "@/constant/constant";
import Dropdown from "../reusable/Dropdown";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {};

const TaskNavbar: React.FC<Props> = () => {
    const [taskStatus, setTaskStatus] = useState<"open" | "completed">("open");

    const handleStatusChange = (status: "open" | "completed") => {
        setTaskStatus(status);
    };

    const renderStatusButton = (status: "open" | "completed") => (
        <p
            className={`rounded-full w-24 px-1 text-center py-1.5 cursor-pointer ${
                taskStatus === status ? "bg-blue" : "bg-black"
            }`}
            onClick={() => handleStatusChange(status)}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
    );

    const renderIcon = (src: string, alt: string) => (
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
            <Image src={src} alt={alt} width={20} height={20} />
        </div>
    );

    return (
        <div className="flex justify-between p-3 border-b border-gray-600">
            <div className="flex items-center gap-3">
                <Dropdown
                    placeholder="All Tasks"
                    items={TaskTypesItems}
                    onSelect={() => {}}
                />
                <div className="flex items-center bg-black rounded-full text-sm">
                    {renderStatusButton("open")}
                    {renderStatusButton("completed")}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Dropdown
                    placeholder="Today"
                    items={TimeFrames}
                    onSelect={() => {}}
                />
                {renderIcon("/svg/search.svg", "search")}
                {renderIcon("/svg/filter.svg", "filter")}
                <Button className="rounded-full px-6">ADD TASK</Button>
            </div>
        </div>
    );
};

export default TaskNavbar;
