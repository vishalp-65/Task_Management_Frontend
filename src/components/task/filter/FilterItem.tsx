// FilterItem.tsx
import React, { useState } from "react";
import Image from "next/image";
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

type FilterItemProps = {
    label: string;
    data: any[] | null;
    type: "user" | "brand" | "inventory" | "event" | "sort";
    filterType: string;
    handleFilterChange: (field: string, value: string) => {};
    renderImg?: boolean;
};

const FilterItem: React.FC<FilterItemProps> = ({
    label,
    data,
    type,
    filterType,
    handleFilterChange,
    renderImg,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedFilterValue, setSelectedFilterValue] =
        useState<string>("None");

    // Function to get the display name based on the type
    const getItemDisplayName = (item: any) => {
        switch (type) {
            case "brand":
                return item.brand_name;
            case "user":
                return item.user_name;
            case "inventory":
                return item.name;
            case "event":
                return item.name;
            case "sort":
                return item.label;
            default:
                return "";
        }
    };

    const handleFilterSelect = (value: string) => {
        handleFilterChange(filterType, value);
        setSelectedFilterValue(value);
    };

    // Filter the data based on the search value
    const filteredData = data?.filter((item) =>
        getItemDisplayName(item)
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    );

    // Handle input change for search
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:border-gray-800 hover:rounded-xl">
                <div className="bg-taskContainer_dark cursor-pointer h-[54px] flex items-center justify-between rounded-xl py-2 px-4">
                    <div className="space-y-0.5">
                        <p>{label}</p>
                        {selectedFilterValue !== "None" && (
                            <p className="text-sm text-gray-400">
                                {selectedFilterValue}
                            </p>
                        )}
                    </div>
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
                <DropdownMenuSubContent className="w-[250px] px-2 py-2 rounded-xl bg-taskContainer_dark text-white border-none m-3">
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={handleInputChange}
                        placeholder={`Search ${label.toLowerCase()}...`}
                        className="bg-slate-700 placeholder:text-gray-400 py-1"
                    />
                    {data && (
                        <p
                            className="leading-[20px] cursor-pointer hover:bg-transparent/85 rounded-lg p-2"
                            onClick={() => handleFilterSelect("")}
                        >
                            None
                        </p>
                    )}
                    <ul>
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <li
                                    key={item.id}
                                    className="leading-[20px] cursor-pointer hover:bg-transparent/85 rounded-lg p-2"
                                    onClick={() =>
                                        handleFilterSelect(
                                            getItemDisplayName(item)
                                        )
                                    }
                                >
                                    {getItemDisplayName(item)}
                                </li>
                            ))
                        ) : (
                            <p className="p-2 text-gray-300">No {type} found</p>
                        )}
                    </ul>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export default FilterItem;
