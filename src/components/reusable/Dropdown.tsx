import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type DropdownItem = {
    value: string;
    label: string;
};

type DropdownProps = {
    placeholder?: string;
    items: DropdownItem[];
    className?: string;
    onSelect?: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
    placeholder = "Select",
    items,
    className = "",
    onSelect,
}) => {
    return (
        <Select onValueChange={onSelect}>
            <SelectTrigger
                className={`w-[120px] bg-transparent border-gray-600 ${className}`}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="text-white bg-transparent border-gray-600 bg-gray-700">
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default Dropdown;
