import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuPortal,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { truncateText } from "@/util/helper";

type TaskItemProps = {
    src: string;
    type: string;
    alt: string;
    label: string;
    data: any[] | null;
    onItemSelect: (name: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
    src,
    type,
    alt,
    label,
    data,
    onItemSelect,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const getItemDisplayName = useCallback(
        (item: any) => {
            if (!item) return "";
            switch (type) {
                case "brand":
                    return item.brand_name;
                case "user":
                    return item.user_name;
                case "inventory":
                case "event":
                    return item.name;
                default:
                    return "";
            }
        },
        [type]
    );

    const handleItemSelect = (id: string, name: string) => {
        setSelectedItem(name);
        onItemSelect(id);
    };

    const filteredData = useMemo(
        () =>
            data?.filter((item) =>
                getItemDisplayName(item)
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ),
        [data, searchValue, getItemDisplayName]
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 text-sm rounded-xl py-2 px-4 cursor-pointer bg-button_bg">
                    <Image src={src} alt={alt} width={16} height={16} />
                    <span>
                        {selectedItem ? truncateText(selectedItem, 8) : label}
                    </span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent className="w-[250px] max-h-[300px] overflow-y-auto px-2 py-2 rounded-xl bg-taskContainer_dark text-white border-none m-3">
                    <Input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={`Search ${label}...`}
                        className="bg-slate-700 placeholder:text-gray-400 py-1 mb-2"
                    />
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((item: any) => (
                            <DropdownMenuItem
                                key={item.id}
                                className="cursor-pointer hover:bg-slate-500 rounded-lg p-1 transition-colors"
                                onClick={() =>
                                    handleItemSelect(
                                        item.id,
                                        getItemDisplayName(item)
                                    )
                                }
                            >
                                {getItemDisplayName(item)}
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <p className="text-center text-gray-400">
                            No matching {type}.
                        </p>
                    )}
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
};

export default TaskItem;
