// FilterContainer.tsx
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import FilterItem from "./FilterItem"; // Component for each filter item
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/filterStore";
import { sortByValues } from "@/constant/constant";

const FilterContainer = () => {
    const { fetchTaskList } = useTaskStore();
    const { allUsers, teamUser, brands, inventories, events, fetchAllData } =
        useUserStore();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [filters, setFilters] = useState({
        taskType: "all",
        assignedTo: "",
        assignedBy: "",
        dueDate: "all",
        sortBy: "title",
        order: "asc",
    });

    const categories = [
        { label: "All", value: "all" },
        { label: "General Service", value: "general" },
        { label: "Brand", value: "brand" },
        { label: "Event", value: "event" },
        { label: "Inventory", value: "inventory" },
    ];

    const handleFilterChange = async (field: string, value: string) => {
        // value = value.split(" ")[0].toLowerCase();
        console.log(filters);
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
        await fetchTaskList({ ...filters, [field]: value });
    };

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={isFilterOpen}>
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#23252D] border border-[#50515B]"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <Image
                        src="/svg/filter.svg"
                        alt="filter"
                        width={20}
                        height={20}
                    />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[350px] max-h-[600px] overflow-hidden overflow-y-auto bg-[#1B1E25] text-white border-none px-3.5 py-4 rounded-2xl">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/svg/filter.svg"
                                alt="filter"
                                width={22}
                                height={22}
                            />
                            <p>Filter Brands</p>
                        </div>
                        <Image
                            src="/svg/close.svg"
                            alt="close"
                            width={30}
                            height={30}
                            className="cursor-pointer p-1 rounded-full hover:bg-transparent/80"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                    </div>

                    {/* Task Based On Filter */}
                    <div className="bg-taskContainer_dark rounded-xl py-3 px-4 space-y-3.5">
                        <p>Task Based On</p>
                        <div className="space-y-2">
                            {/* Grid layout for buttons */}
                            <div className="grid grid-cols-2 gap-2">
                                {categories
                                    .slice(0, 2)
                                    .map((category, index) => (
                                        <p
                                            key={index}
                                            onClick={() => {
                                                setActiveButton(index);
                                                handleFilterChange(
                                                    "taskBased",
                                                    category.value
                                                );
                                            }}
                                            className={`py-1.5 px-1 text-center w-full rounded-xl cursor-pointer ${
                                                activeButton === index
                                                    ? "bg-white text-black"
                                                    : "bg-[#1B1E25] text-gray-300"
                                            }`}
                                        >
                                            {category.label}
                                        </p>
                                    ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {categories.slice(2).map((category, index) => (
                                    <p
                                        key={index + 2} // Adjust the key for the second slice
                                        onClick={() => {
                                            setActiveButton(index + 2);
                                            handleFilterChange(
                                                "taskBased",
                                                category.value
                                            );
                                        }}
                                        className={`py-1.5 px-1 text-center w-full rounded-xl cursor-pointer ${
                                            activeButton === index + 2
                                                ? "bg-white text-black"
                                                : "bg-[#1B1E25] text-gray-300"
                                        }`}
                                    >
                                        {category.label}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Assigned By */}
                    <FilterItem
                        type="user"
                        data={allUsers}
                        label="Assigned By"
                        filterType="assignedBy"
                        handleFilterChange={handleFilterChange}
                        renderImg
                    />

                    {/* Assigned To */}
                    <FilterItem
                        type="user"
                        data={allUsers}
                        label="Assigned To"
                        filterType="assignedTo"
                        handleFilterChange={handleFilterChange}
                        renderImg
                    />

                    {/* Team Owners */}
                    <FilterItem
                        type="user"
                        data={teamUser}
                        label="Team Owners"
                        filterType="teamOwner"
                        handleFilterChange={handleFilterChange}
                        renderImg
                    />

                    {/* Brands */}
                    <FilterItem
                        type="brand"
                        data={brands}
                        label="Brands"
                        filterType="brandName"
                        handleFilterChange={handleFilterChange}
                    />

                    {/* Inventories */}
                    <FilterItem
                        type="inventory"
                        data={inventories}
                        label="Inventories"
                        filterType="inventoryName"
                        handleFilterChange={handleFilterChange}
                    />

                    {/* Events */}
                    <FilterItem
                        type="event"
                        data={events}
                        label="Events"
                        filterType="eventName"
                        handleFilterChange={handleFilterChange}
                    />

                    {/* Due Date Filter */}
                    <div className="bg-taskContainer_dark rounded-xl py-3 px-4 space-y-3.5">
                        <div className="flex items-center gap-1.5">
                            <p>Due date</p>
                            <Image
                                src="/svg/info-filter.svg"
                                alt="info filter"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className="flex items-center text-center justify-between gap-2">
                            {["All", "Upcoming", "Overdue"].map((date) => (
                                <p
                                    key={date}
                                    className={`py-1 w-full rounded-xl cursor-pointer ${
                                        filters.dueDate === date
                                            ? "bg-white text-black"
                                            : "bg-[#1B1E25]"
                                    }`}
                                    onClick={() =>
                                        handleFilterChange("status", date)
                                    }
                                >
                                    {date}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Sort By */}
                    <FilterItem
                        type="sort"
                        data={sortByValues}
                        label="Sort by"
                        filterType="sortBy"
                        handleFilterChange={handleFilterChange}
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterContainer;
