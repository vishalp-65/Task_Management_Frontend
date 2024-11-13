import React from "react";
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

type Props = {
    task: Task;
};

const TaskDropDownMenu = ({ task }: Props) => {
    const { deleteTask } = useTaskStore();

    return (
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
                <DropdownMenuItem>
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
                <DropdownMenuItem>
                    <Image
                        src="/svg/copy.svg"
                        alt="copy"
                        width={20}
                        height={20}
                    />
                    <span>Duplicate Task</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Image
                        src="/svg/checkmark-circle.svg"
                        alt="completed"
                        width={20}
                        height={20}
                    />
                    <span>Mark as Completed</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => deleteTask(task?.id)}>
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
    );
};

export default TaskDropDownMenu;
