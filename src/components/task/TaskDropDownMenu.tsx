import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { Task } from "@/types/types";
import { useTaskStore } from "@/store/taskStore";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "../reusable/ConfirmationDialog";
import TaskInfoContainer from "./taskInfo/TaskInfoContainer";

type Props = {
    task: Task;
};

const TaskDropDownMenu: React.FC<Props> = ({ task }) => {
    const { toast } = useToast();
    const { addTask, markAsCompletedTask, deleteTask, fetchTaskList } =
        useTaskStore();
    const [buttonName, setButtonName] = useState<string>("CONFIRM");
    const [infoOpenCloseModal, setInfoOpenCloseModal] =
        useState<boolean>(false);
    const [dialogData, setDialogData] = useState<{
        open: boolean;
        title: string;
        description: string;
        action: () => Promise<void>;
    }>({
        open: false,
        title: "",
        description: "",
        action: async () => {},
    });

    const handleDelete = async () => {
        const result = await deleteTask(task.id);
        handleToast(result, "Task deleted", "Task not deleted");
    };

    const handleMarkAsCompleted = async () => {
        const result = await markAsCompletedTask(task.id, {
            status: "completed",
        });
        handleToast(result, "Task marked as completed", "Task not updated");
    };

    const handleDuplicateTask = async () => {
        const newTask = {
            title: task.title,
            description: task.description || "",
            task_type: task.task_type,
            due_date: task.due_date,
            assigneeId: task.assignee?.id || "",
            brandId: task?.brand?.id || undefined,
            eventId: task?.event?.id || undefined,
            inventoryId: task?.inventory?.id || undefined,
        };

        const result = await addTask(newTask);
        handleToast(result, "Duplicate task created", "Task not duplicated");
    };

    const handleToast = (
        result: boolean | string,
        successMessage: string,
        errorMessage: string
    ) => {
        if (result === true) {
            toast({ title: successMessage, variant: "default" });
            fetchTaskList();
        } else {
            toast({
                title: errorMessage,
                description: result as string,
                variant: "destructive",
            });
        }
    };

    const openDialog = (
        title: string,
        description: string,
        action: () => Promise<void>
    ) => {
        setDialogData({ open: true, title, description, action });
    };

    const handleCloseDialog = () => {
        setDialogData({
            open: false,
            action: async () => {},
            description: "",
            title: "",
        });
    };

    const handleInfoDialogOpenClose = () => {
        setInfoOpenCloseModal(!infoOpenCloseModal);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="p-1 hover:bg-gray-300/70 rounded-full cursor-pointer">
                        <Image
                            src="/svg/three-dot.svg"
                            alt="options"
                            width={20}
                            height={20}
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-16 mb-1 w-20 md:w-52 space-y-2">
                    <DropdownMenuItem onClick={handleInfoDialogOpenClose}>
                        <Image
                            src="/svg/info.svg"
                            alt="info"
                            width={20}
                            height={20}
                        />
                        <span>View Info</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Image
                            src="/svg/message-circle.svg"
                            alt="comment"
                            width={20}
                            height={20}
                        />
                        <span>Add Comment</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Image
                            src="/svg/edit.svg"
                            alt="edit"
                            width={20}
                            height={20}
                        />
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            openDialog(
                                "Duplicate Task",
                                "Are you sure you want to duplicate this task?",
                                handleDuplicateTask
                            );
                            setButtonName("DUPLICATE");
                        }}
                    >
                        <Image
                            src="/svg/copy.svg"
                            alt="copy"
                            width={20}
                            height={20}
                        />
                        <span>Duplicate Task</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => {
                            openDialog(
                                "Complete Task",
                                "Mark this task as completed?",
                                handleMarkAsCompleted
                            );
                            setButtonName("COMPLETE TASK");
                        }}
                    >
                        <Image
                            src="/svg/checkmark-circle.svg"
                            alt="completed"
                            width={20}
                            height={20}
                        />
                        <span>Mark as Completed</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() => {
                            openDialog(
                                "Delete Task",
                                `Are you sure you want to delete '${task.title}'? This action cannot be undone. The assigned person for this task will be notified.`,
                                handleDelete
                            );
                            setButtonName("DELETE");
                        }}
                    >
                        <Image
                            src="/svg/trash.svg"
                            alt="delete"
                            width={20}
                            height={20}
                        />
                        <span className="text-red-500">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {dialogData.open && (
                <ConfirmationDialog
                    description={dialogData.description}
                    buttonName={buttonName}
                    isOpen={dialogData.open}
                    handleCloseDialog={handleCloseDialog}
                    handleConfirmClick={async () => {
                        await dialogData.action();
                        setDialogData((prev) => ({ ...prev, open: false }));
                    }}
                />
            )}

            {infoOpenCloseModal && (
                <TaskInfoContainer
                    isOpen={infoOpenCloseModal}
                    handleInfoDialogOpenClose={handleInfoDialogOpenClose}
                />
            )}
        </>
    );
};

export default TaskDropDownMenu;
