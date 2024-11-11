import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import { sortByValues } from "@/constant/constant";
import { useUserStore } from "@/store/filterStore";

type Props = {};

const FilterContainer = (props: Props) => {
    const { fetchTaskList } = useTaskStore();
    const {
        allUsers,
        teamUser,
        brands,
        inventories,
        events,
        fetchBrands,
        fetchEvents,
        fetchInventories,
        fetchTeamUsers,
        fetchAllUsers,
    } = useUserStore();
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    // Track the active button
    const [activeButton, setActiveButton] = useState(0);
    const [filters, setFilters] = useState({
        taskType: "All",
        assignedTo: "",
        assignedBy: "",
        dueDate: "All",
        sortBy: "",
    });

    // Array of button labels
    const categories = [
        { label: "All" },
        {
            label: "General Service",
        },
        { label: "Brand" },
        { label: "Event" },
        {
            label: "Inventory",
        },
    ];

    // Handle click event to set active button
    const handleClick = (index: any) => {
        setActiveButton(index);
    };

    // Function to handle updates to the filters
    const handleFilterChange = async (field: string, value: string) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        await fetchTaskList(updatedFilters); // Fetch tasks based on filters
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    useEffect(() => {
        fetchTeamUsers();
        fetchBrands();
        fetchInventories();
        fetchEvents();
    }, [fetchTeamUsers, fetchBrands, fetchInventories, fetchEvents]);

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
                                            onClick={() => handleClick(index)}
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
                                        onClick={() => handleClick(index + 2)}
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
                        renderImg
                    />

                    {/* Assigned To */}
                    <FilterItem
                        type="user"
                        data={allUsers}
                        label="Assigned To"
                        renderImg
                    />

                    {/* Team Owners */}
                    <FilterItem
                        type="user"
                        data={teamUser}
                        label="Team Owners"
                        renderImg
                    />

                    {/* Brands */}
                    <FilterItem type="brand" data={brands} label="Brands" />

                    {/* Inventories */}
                    <FilterItem
                        type="inventory"
                        data={inventories}
                        label="Inventories"
                    />

                    {/* Events */}
                    <FilterItem type="event" data={events} label="Events" />

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
                                        handleFilterChange("dueDate", date)
                                    }
                                >
                                    {date}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Sort By Dropdown */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="hover:border-gray-800 hover:rounded-xl">
                            <div className="bg-taskContainer_dark cursor-pointer h-[54px] flex items-center justify-between rounded-xl py-2 px-4">
                                <p>Sort by</p>
                                <div className="flex items-center">
                                    <Image
                                        src="/svg/arrow-right.svg"
                                        alt="arrow right"
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </div>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-[250px] px-2 py-1 rounded-xl bg-taskContainer_dark text-white border-none m-3">
                                {sortByValues.map((sort) => (
                                    <p className="cursor-pointer hover:bg-transparent/85 p-2 rounded-lg">
                                        {sort.label}
                                    </p>
                                ))}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

// Reusable Filter Item component
const FilterItem = ({
    label,
    data,
    type,
    onClick,
    renderImg = false,
}: {
    label: string;
    data: any;
    type: string;
    onClick?: () => void;
    renderImg?: boolean;
}) => (
    <DropdownMenuSub>
        <DropdownMenuSubTrigger className="hover:border-gray-800 hover:rounded-xl">
            <div
                className="bg-taskContainer_dark cursor-pointer h-[54px] flex items-center justify-between rounded-xl py-2 px-4"
                onClick={onClick}
            >
                <p>{label}</p>
                <div className="flex items-center">
                    {renderImg && (
                        <>
                            <Image
                                src="/svg/avatars.svg"
                                alt="avatar"
                                width={25}
                                height={25}
                            />
                            <p className="text-blue mx-2">+4</p>
                        </>
                    )}
                    <Image
                        src="/svg/arrow-right.svg"
                        alt="arrow right"
                        width={20}
                        height={20}
                    />
                </div>
            </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-[250px] px-2 py-1 rounded-xl bg-taskContainer_dark text-white border-none m-3">
                {data ? (
                    data.map((item: any) => (
                        <p className="cursor-pointer hover:bg-transparent/85 p-2 rounded-lg">
                            {type === "brand" ? data.brand_name : data.name}
                        </p>
                    ))
                ) : (
                    <p className="p-2 text-gray-300">No user found</p>
                )}
            </DropdownMenuSubContent>
        </DropdownMenuPortal>
    </DropdownMenuSub>
);

export default FilterContainer;
