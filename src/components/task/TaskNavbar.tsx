// src/components/TaskNavbar.tsx
import React, { useEffect, useState } from "react";
import { TaskTypesItems, TimeFrames } from "@/constant/constant";
import Dropdown from "../reusable/Dropdown";
import { Input } from "../ui/input";
import { useTaskStore } from "@/store/taskStore";
import IconWithButton from "../reusable/IconWithButton";
import { capitalizeFirstLetter } from "@/util/helper";
import AddNewTaskModal from "./newTask/AddNewTaskModal";
import FilterContainer from "./filter/FilterContainer";

type Props = {
    currentTaskStatus: "open" | "completed";
    handleTaskStatusChange: (status: "open" | "completed") => void;
};

const TaskNavbar: React.FC<Props> = ({
    currentTaskStatus,
    handleTaskStatusChange,
}) => {
    const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
    const [filters, setFilters] = useState<any>({});
    const { fetchTaskList } = useTaskStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const handleSearchClick = () => setIsSearchSelected((prev) => !prev);

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Fetch tasks whenever the debounced search term changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchTaskList({ taskName: debouncedSearchTerm });
        } else {
            fetchTaskList();
        }
    }, [debouncedSearchTerm, fetchTaskList]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const renderStatusButton = (status: "open" | "completed") => (
        <p
            className={`rounded-full w-24 px-1 text-center py-1.5 cursor-pointer ${
                currentTaskStatus === status ? "bg-blue" : "bg-black"
            }`}
            onClick={() => handleTaskStatusChange(status)}
        >
            {capitalizeFirstLetter(status)}
        </p>
    );

    return (
        <div className="flex justify-between p-3 border-b border-gray-600 z-2">
            <div className="flex grow items-center gap-3">
                <Dropdown
                    placeholder="All Tasks"
                    items={TaskTypesItems}
                    onSelect={(selected) => {
                        setFilters((prev: any) => ({
                            ...prev,
                            taskType: selected,
                        }));
                        fetchTaskList({ ...filters, taskType: selected });
                    }}
                />
                <div className="flex items-center bg-black rounded-full text-sm">
                    {renderStatusButton("open")}
                    {renderStatusButton("completed")}
                </div>
            </div>
            <div className="flex grow items-center justify-end gap-3 w-fit">
                <Dropdown
                    placeholder="Today"
                    items={TimeFrames}
                    onSelect={(selected) => {
                        setFilters((prev: any) => ({
                            ...prev,
                            timeFrame: selected,
                        }));
                        fetchTaskList({ ...filters, timeFrame: selected });
                    }}
                />
                {isSearchSelected || searchTerm ? (
                    <Input
                        type="text"
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={handleSearch}
                        className="text-white rounded-2xl max-w-52 h-9 bg-gray-700 transition placeholder:text-gray-400"
                        onBlur={() => setIsSearchSelected(false)} // Hide input when it loses focus
                    />
                ) : (
                    <IconWithButton
                        src="/svg/search.svg"
                        alt="search"
                        customClassName="bg-[#23252D] border border-[#50515B] hover:bg-[#3a3c42] p-2 rounded-full"
                        handleClick={handleSearchClick} // Focus input when icon is clicked
                    />
                )}
                <FilterContainer />
                <AddNewTaskModal />
            </div>
        </div>
    );
};

export default TaskNavbar;
