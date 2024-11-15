import React from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/util/helper";

type DatePickerProps = {
    src: string;
    alt: string;
    label: string;
    selectedDate: string;
    onDateChange: (date: string) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
    src,
    alt,
    label,
    selectedDate,
    onDateChange,
}) => {
    const [date, setDate] = React.useState<Date | undefined>(
        selectedDate ? new Date(selectedDate) : undefined
    );

    const handleDateSelect = (selected: Date | undefined) => {
        if (selected) {
            setDate(selected);
            onDateChange(selected.toISOString());
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center gap-2 text-sm rounded-xl py-2 px-4 cursor-pointer bg-button_bg">
                    <Image src={src} alt={alt} width={16} height={16} />
                    {date ? formatDate(date) : <span>{label}</span>}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
