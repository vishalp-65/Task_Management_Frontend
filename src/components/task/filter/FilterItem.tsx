// FilterItem.tsx
import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { truncateText } from "@/util/helper";

type FilterItemProps = {
    label: string;
    data: any[] | null;
    type: string;
    filterType: string;
    handleFilterChange: (field: string, value: string) => void;
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
    const [selectedFilterValue, setSelectedFilterValue] = useState("None");

    const getItemDisplayName = useCallback(
        (item: any) => {
            switch (type) {
                case "brand":
                    return item.brand_name;
                case "user":
                    return item.user_name;
                case "inventory":
                case "event":
                    return item.name;
                case "sort":
                    return item.label;
                default:
                    return "";
            }
        },
        [type]
    );

    const filteredData = useMemo(
        () =>
            data?.filter((item) =>
                getItemDisplayName(item)
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ),
        [data, searchValue, getItemDisplayName]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleFilterSelect = (value: string) => {
        handleFilterChange(filterType, value);
        setSelectedFilterValue(value || "None");
    };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:border-gray-800 hover:rounded-xl">
                <div className="bg-taskContainer_dark cursor-pointer h-[54px] flex items-center justify-between rounded-xl py-2 px-4">
                    <div>
                        <p>{label}</p>
                        {selectedFilterValue !== "None" && (
                            <p className="text-sm text-gray-400">
                                {truncateText(selectedFilterValue, 30)}
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
                        className="bg-slate-700 placeholder:text-gray-400 py-1 mb-2"
                    />
                    <p
                        className="leading-[20px] cursor-pointer hover:bg-transparent/85 rounded-lg p-2"
                        onClick={() => handleFilterSelect("")}
                    >
                        None
                    </p>
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
