// FilterItem.tsx
import React from "react";
import Image from "next/image";
import {
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

type FilterItemProps = {
    label: string;
    data: any[] | null;
    type: "user" | "brand" | "inventory" | "event" | "sort";
    renderImg?: boolean;
};

const FilterItem: React.FC<FilterItemProps> = ({
    label,
    data,
    type,
    renderImg,
}) => {
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

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className="hover:border-gray-800 hover:rounded-xl">
                <div className="bg-taskContainer_dark cursor-pointer h-[54px] flex items-center justify-between rounded-xl py-2 px-4">
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
                            <p
                                key={item.id}
                                className="leading-[20px] cursor-pointer hover:bg-transparent/85 rounded-lg p-2"
                            >
                                {getItemDisplayName(item)}
                            </p>
                        ))
                    ) : (
                        <p className="p-2 text-gray-300">No {type} found</p>
                    )}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export default FilterItem;
