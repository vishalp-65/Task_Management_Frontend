import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import CustomSelect from "../reusable/SelectWithImage";
import { SelectItemForNewTask } from "@/constant/constant";

// Reusable Text Input Component
const TextInput = ({
    placeholder,
    customClass,
    isDescription = false,
}: {
    placeholder: string;
    customClass: string;
    isDescription?: boolean;
}) =>
    isDescription ? (
        <textarea
            placeholder={placeholder}
            className={`${customClass} placeholder:font-serif bg-transparent outline-none border-none resize-none focus:ring-0 text-white w-full`}
        />
    ) : (
        <Input
            placeholder={placeholder}
            className={`${customClass} placeholder:font-serif bg-transparent outline-none border-none focus:ring-0 text-white w-full`}
        />
    );

// Reusable Icon Button Component
const IconButton = ({
    src,
    alt,
    label,
}: {
    src: string;
    alt: string;
    label: string;
}) => (
    <div className="flex items-center gap-2 text-sm rounded-xl py-2 px-4 cursor-pointer bg-button_bg">
        <Image src={src} alt={alt} width={16} height={16} />
        <p>{label}</p>
    </div>
);

const AddNewTaskModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full px-6">ADD TASK</Button>
            </DialogTrigger>
            <DialogContent
                className="space-y-1 text-white border border-transparent bg-new_task_bg rounded-3xl px-0 drop-shadow-2xl"
                style={{ maxWidth: "650px" }} // Fixed width for dialog
            >
                <div className="flex items-center justify-between px-4">
                    <HeaderWithIcon
                        src="/svg/tasks-list.svg"
                        alt="task image"
                        title="Add New Task"
                    />
                </div>

                <Divider />

                <div className="px-4">
                    <TextInput
                        placeholder="What’s this task about?*"
                        isDescription
                        customClass="placeholder:text-lg"
                    />
                    <TextInput
                        placeholder="Give a description for it (optional)..."
                        isDescription
                        customClass="h-20 text-sm placeholder:text-sm"
                    />

                    <Divider />

                    <div className="flex items-center justify-evenly mt-4 text-gray-300">
                        <CustomSelect
                            placeholder="Task Type"
                            items={SelectItemForNewTask}
                            placeHolderImage="/svg/tasks-list.svg"
                        />

                        <div className="border-r h-5 border-gray-700" />

                        <IconButton
                            src="/svg/calendar.svg"
                            alt="Calendar"
                            label="Tomorrow"
                        />
                        <IconButton
                            src="/svg/person.svg"
                            alt="Person"
                            label="Assignee"
                        />
                        <IconButton
                            src="/svg/clipboard.svg"
                            alt="Clipboard"
                            label="Brand Name"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewTaskModal;

// Header with Icon Component
const HeaderWithIcon = ({
    src,
    alt,
    title,
}: {
    src: string;
    alt: string;
    title: string;
}) => (
    <div className="flex items-center gap-3">
        <Image src={src} alt={alt} width={24} height={24} />
        <p className="font-serif text-lg">{title}</p>
    </div>
);

// Divider Component
const Divider = () => <div className="border-b border-gray-700 w-full" />;
