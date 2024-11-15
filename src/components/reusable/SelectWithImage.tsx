import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import Image from "next/image";
import { capitalizeFirstLetter } from "@/util/helper";

type DropdownItem = {
    value: string;
    label: string;
    imgPath: string;
};

type DropdownProps = {
    placeholder?: string;
    placeHolderImage: string;
    items: DropdownItem[];
    className?: string;
    onSelect?: (value: string) => void;
    handleTaskType: (type: string) => void;
};

const CustomSelect: React.FC<DropdownProps> = ({
    placeholder = "Select",
    placeHolderImage,
    items,
    className = "",
    handleTaskType,
    onSelect,
}) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    // Handle selection change
    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
        handleTaskType(value);
        if (onSelect) onSelect(value); // Optional callback
    };

    return (
        <Select onValueChange={handleSelectChange} value={selectedValue ?? ""}>
            <SelectTrigger
                className={`w-fit gap-3 h-9 px-4 border-none rounded-lg bg-button_bg ${className}`}
            >
                <div className="flex items-center gap-1.5">
                    <Image
                        src={placeHolderImage}
                        alt="placeholder"
                        width={17}
                        height={17}
                    />
                    {selectedValue ? (
                        <SelectValue>
                            {/* If selectedValue is null, show the placeholder */}
                            {capitalizeFirstLetter(selectedValue)}
                        </SelectValue>
                    ) : (
                        <SelectValue placeholder={placeholder} />
                    )}
                </div>
            </SelectTrigger>
            <SelectContent className="text-new_task_bg w-44 bg-white rounded-xl">
                {items.map((item) => (
                    <SelectItem
                        key={item.value}
                        value={item.value}
                        className={`w-full px-2 space-y-1 ${className}`}
                    >
                        <div className="flex items-center gap-2 w-full">
                            {/* Image and label for each option */}
                            <Image
                                src={item.imgPath}
                                alt={item.label}
                                height={18}
                                width={18}
                                className="flex-shrink-0"
                            />
                            <p className="truncate">{item.label}</p>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CustomSelect;
