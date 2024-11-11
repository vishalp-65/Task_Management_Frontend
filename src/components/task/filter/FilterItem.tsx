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
    type: "user" | "brand" | "inventory" | "event";
};

const FilterItem: React.FC<FilterItemProps> = ({ label, data, type }) => {
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
            default:
                return "";
        }
    };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <div className="flex justify-between items-center px-[16px] pb-[12px] cursor-pointer">
                    <p className="text-[14px] font-medium leading-[20px]">
                        {label}
                    </p>
                    <Image
                        src="/svg/arrow-right.svg"
                        alt="arrow right"
                        width={20}
                        height={20}
                    />
                </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-[200px] h-[290px] overflow-auto flex flex-col bg-[#F9FAFB] rounded-[8px] p-[8px] mt-[4px] shadow-lg">
                    {data ? (
                        data.map((item) => (
                            <p
                                key={item.id}
                                className="text-[14px] leading-[20px] text-[#1D1E2C] cursor-pointer hover:bg-gray-100 p-[8px] rounded-[4px]"
                            >
                                {getItemDisplayName(item)}
                            </p>
                        ))
                    ) : (
                        <p className="text-[14px] text-[#667085] p-[8px]">
                            No data found
                        </p>
                    )}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
};

export default FilterItem;
