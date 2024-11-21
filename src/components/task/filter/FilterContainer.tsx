// FilterContainer.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import FilterItem from "./FilterItem";
import { useTaskStore } from "@/store/taskStore";
import { useUserStore } from "@/store/filterStore";
import { categories, sortByValues } from "@/constant/constant";

const FilterContainer = () => {
    const {
        sortBy,
        assignedTo,
        assignedBy,
        brandName,
        inventoryName,
        eventName,
        teamOwner,
        fetchTaskList,
    } = useTaskStore();
    const { allUsers, teamUser, brands, inventories, events, fetchAllData } =
        useUserStore();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeButton, setActiveButton] = useState(0);
    const [filters, setFilters] = useState({
        taskType: "all",
        dueDate: "all",
        sortBy: "created_at",
        order: "desc",
    });

    const filter = [
        {
            type: "user",
            data: allUsers,
            label: "Assigned By",
            filterType: "assignedBy",
            renderImg: true,
            selectedValue: assignedBy,
        },
        {
            type: "user",
            data: allUsers,
            label: "Assigned To",
            filterType: "assignedTo",
            renderImg: true,
            selectedValue: assignedTo,
        },
        {
            type: "user",
            data: teamUser,
            label: "Team Owners",
            filterType: "teamOwner",
            renderImg: true,
            selectedValue: teamOwner,
        },
        {
            type: "brand",
            data: brands,
            label: "Brands",
            filterType: "brandName",
            selectedValue: brandName,
        },
        {
            type: "inventory",
            data: inventories,
            label: "Inventories",
            filterType: "inventoryName",
            selectedValue: inventoryName,
        },
        {
            type: "event",
            data: events,
            label: "Events",
            filterType: "eventName",
            selectedValue: eventName,
        },
    ];

    const handleFilterChange = useCallback(
        async (
            field: string,
            value: string | { sortBy: string; order: string }
        ) => {
            const updatedFilters =
                field === "sortBy" &&
                typeof value === "object" &&
                "sortBy" in value &&
                "order" in value
                    ? { ...filters, sortBy: value.sortBy, order: value.order }
                    : { ...filters, [field]: value };

            setFilters(updatedFilters);
            await fetchTaskList(updatedFilters);
        },
        [filters, fetchTaskList]
    );

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    return (
        <DropdownMenu open={isFilterOpen}>
            <DropdownMenuTrigger>
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

            <DropdownMenuContent className="w-[350px] max-h-[700px] mt-[-50px] overflow-hidden overflow-y-auto bg-[#1B1E25] text-white border-none px-3.5 py-4 rounded-2xl">
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
                                        key={index + 2}
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

                    {/* Filter Items */}
                    {filter.map(
                        ({
                            type,
                            data,
                            label,
                            filterType,
                            renderImg,
                            selectedValue,
                        }) => (
                            <FilterItem
                                key={filterType}
                                type={type}
                                data={data}
                                label={label}
                                selectedFilterValue={selectedValue}
                                filterType={filterType}
                                handleFilterChange={handleFilterChange}
                                renderImg={renderImg}
                            />
                        )
                    )}

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
                                        handleFilterChange(
                                            date === "All"
                                                ? "taskType"
                                                : "status",
                                            date.toLowerCase()
                                        )
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
                        selectedFilterValue={sortBy}
                        handleFilterChange={handleFilterChange}
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default FilterContainer;
