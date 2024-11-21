import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { SelectItemForNewTask } from "@/constant/constant";
import { capitalizeFirstLetter } from "@/util/helper";
import { useUserStore } from "@/store/filterStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/reusable/SelectWithImage";
import TaskItem from "./TaskItem";
import DatePicker from "@/components/reusable/DatePicker";
import { useTaskStore } from "@/store/taskStore";
import { useToast } from "@/hooks/use-toast";

export type NewTaskData = {
    title: string;
    description?: string;
    task_type: string;
    due_date: string;
    assigneeId: string;
    brandId?: string;
    eventId?: string;
    inventoryId?: string;
};

// Reusable Text Input Component
const TextInput = ({
    placeholder,
    customClass,
    isDescription = false,
    value,
    onChange,
}: {
    placeholder: string;
    customClass: string;
    isDescription?: boolean;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}) =>
    isDescription ? (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${customClass} placeholder:font-serif bg-transparent outline-none border-none resize-none focus:ring-0 text-white w-full`}
        />
    ) : (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${customClass} placeholder:font-serif bg-transparent outline-none border-none focus:ring-0 text-white w-full`}
        />
    );

const AddNewTaskModal = () => {
    const [taskType, setTaskType] = useState<string>("general");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { allUsers, brands, events, inventories } = useUserStore();
    const { addTask } = useTaskStore();
    const { toast } = useToast();
    const [taskData, setTaskData] = useState<NewTaskData>({
        title: "",
        description: "",
        task_type: "general",
        assigneeId: "",
        due_date: "",
    });

    const handleTaskDataChange = (key: keyof NewTaskData, value: string) => {
        setTaskData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleTaskType = useCallback((type: string) => {
        setTaskType(type);
        setTaskData((prevData) => ({
            ...prevData,
            task_type: type,
            brandId: type === "brand" ? "" : undefined,
            eventId: type === "event" ? "" : undefined,
            inventoryId: type === "inventory" ? "" : undefined,
        }));
    }, []);

    useEffect(() => {
        setTaskData((prevData) => ({
            ...prevData,
            inventoryId: "",
            eventId: "",
            brandId: "",
        }));
    }, [taskType]);

    const validate = useCallback(() => {
        const newErrors: { [key: string]: string } = {};

        if (!taskData.title) newErrors.title = "Title is required.";
        if (!taskData.due_date) newErrors.due_date = "Due date is required.";
        if (!taskData.assigneeId)
            newErrors.assigneeId = "Assignee user is required.";
        if (!taskData.task_type) newErrors.task_type = "Task Type is required.";

        if (taskData.task_type === "event" && !taskData.eventId) {
            newErrors.eventId = "EventId is required.";
        } else if (taskData.task_type === "brand" && !taskData.brandId) {
            newErrors.brandId = "BrandId is required.";
        } else if (
            taskData.task_type === "inventory" &&
            !taskData.inventoryId
        ) {
            newErrors.inventoryId = "InventoryId is required.";
        }

        setErrors(newErrors);
        return Object.values(newErrors)[0] || null;
    }, [taskData]);

    const createNewTask = async () => {
        setErrors({}); // Clear previous errors

        const firstError = validate();
        if (firstError) {
            console.log("errors", errors);
            toast({
                title: "Validation Error",
                description: firstError,
                variant: "destructive",
            });
            return;
        }
        const result = await addTask(taskData);

        if (result !== true) {
            toast({
                title: "Task not created",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Task created",
                variant: "default",
            });
            setTaskData({
                title: "",
                description: "",
                task_type: "general",
                assigneeId: "",
                due_date: "",
                brandId: "",
                eventId: "",
                inventoryId: "",
            });
        }
    };

    const getItemData = useCallback(() => {
        switch (taskType) {
            case "brand":
                return brands;
            case "inventory":
                return inventories;
            case "event":
                return events;
            default:
                return [];
        }
    }, [taskType, brands, events, inventories]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full px-6">ADD TASK</Button>
            </DialogTrigger>
            <DialogContent
                className="space-y-1 text-white border border-transparent bg-new_task_bg rounded-3xl px-0 drop-shadow-2xl"
                style={{ maxWidth: taskType === "general" ? "750px" : "750px" }}
            >
                <HeaderWithIcon
                    src="/svg/tasks-list.svg"
                    alt="task image"
                    title="Add New Task"
                />
                <Divider />

                <div className="px-4">
                    <TextInput
                        placeholder="What’s this task about?*"
                        isDescription
                        customClass="placeholder:text-lg text-lg"
                        value={taskData.title}
                        onChange={(e) =>
                            handleTaskDataChange("title", e.target.value)
                        }
                    />
                    <TextInput
                        placeholder="Give a description for it (optional)..."
                        isDescription
                        customClass="h-16 text-sm placeholder:text-sm"
                        value={taskData.description || ""}
                        onChange={(e) =>
                            handleTaskDataChange("description", e.target.value)
                        }
                    />

                    <Divider />
                    <div className="flex mt-4 items-center w-full justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                            <CustomSelect
                                placeholder="Task Type"
                                items={SelectItemForNewTask}
                                placeHolderImage="/svg/tasks-list.svg"
                                handleTaskType={handleTaskType}
                            />

                            <DatePicker
                                src="/svg/calendar.svg"
                                alt="Calendar"
                                label="Pick Date"
                                selectedDate={taskData.due_date}
                                onDateChange={(date) =>
                                    handleTaskDataChange("due_date", date)
                                }
                            />

                            <TaskItem
                                src="/svg/person.svg"
                                alt="Person"
                                label="Assignee"
                                type="user"
                                data={allUsers}
                                onItemSelect={(id: any) =>
                                    handleTaskDataChange("assigneeId", id)
                                }
                            />

                            {taskType !== "general" && (
                                <TaskItem
                                    src="/svg/clipboard.svg"
                                    alt="Clipboard"
                                    label={`${capitalizeFirstLetter(
                                        taskType
                                    )} Name`}
                                    type={taskType}
                                    data={getItemData()}
                                    onItemSelect={(id: any) =>
                                        handleTaskDataChange(
                                            `${taskType}Id` as
                                                | "brandId"
                                                | "eventId"
                                                | "inventoryId",
                                            id
                                        )
                                    }
                                />
                            )}
                        </div>
                        <Button
                            className="rounded-full px-6"
                            onClick={createNewTask}
                        >
                            ADD TASK
                        </Button>
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
    <div className="flex items-center gap-3 px-3">
        <Image src={src} alt={alt} width={24} height={24} />
        <p className="font-serif text-lg">{title}</p>
    </div>
);

// Divider Component
export const Divider = () => (
    <div className="border-b border-gray-700 w-full" />
);
