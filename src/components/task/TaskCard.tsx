// src/components/TaskCard.tsx
import { Task } from "@/types/types";
import {
    calculateTimePassed,
    capitalizeFirstLetter,
    truncateText,
} from "@/util/helper";
import Image from "next/image";
import React from "react";
import TaskDropDownMenu from "./TaskDropDownMenu";

// IconText Component for displaying an icon and text side-by-side
const IconText = ({
    src,
    alt,
    text,
    textStyle = "",
    width = 18,
    height = 18,
}: {
    src: string;
    alt: string;
    text: string;
    textStyle?: string;
    width?: number;
    height?: number;
}) => (
    <div className="flex items-center gap-1.5 cursor-pointer">
        <Image src={src} alt={alt} width={width} height={height} />
        <p className={textStyle}>{text}</p>
    </div>
);

// Badge Component for displaying text with an icon
const Badge = ({
    text,
    iconSrc,
    color,
}: {
    text: string;
    iconSrc: string;
    color: string;
}) => (
    <div
        className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-white text-sm ${color}`}
    >
        <Image src={iconSrc} alt="icon" width={15} height={15} />
        <p>{text}</p>
    </div>
);

// ProgressBar Component for visualizing task progress
const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full h-2 rounded-full bg-[#E6E6E6] overflow-hidden">
        <div
            className={`h-full ${
                progress >= 100 ? "bg-[#FC5602]" : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
        />
    </div>
);

type TaskCardProps = {
    task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
    const {
        hoursPassed,
        minutesPassed,
        hoursLeft,
        minutesLeft,
        percentagePassed,
        hoursLate,
        minutesLate,
    } = calculateTimePassed(task.created_at, task.due_date);

    // console.log("task1", task);

    return (
        <div className="bg-white rounded-2xl w-[400px] h-[236px] m-2 p-4 text-black flex flex-col justify-between">
            {/* Task Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-gray-200 rounded-full">
                        <Image
                            src="/svg/cube.svg"
                            alt="cube"
                            width={18}
                            height={18}
                        />
                    </div>
                    <p>{capitalizeFirstLetter(task.task_type)} Service</p>
                </div>
                <div className="flex items-center gap-2">
                    {(percentagePassed >= 100 || task.status === "overdue") && (
                        <Badge
                            text="SLA Breached"
                            iconSrc="/svg/alert.svg"
                            color="bg-red-400"
                        />
                    )}

                    <TaskDropDownMenu task={task} />
                </div>
            </div>

            {/* Task Details */}
            <div>
                <div className="flex items-center gap-1">
                    {task.status === "completed" && (
                        <Image
                            src="/svg/tick-blue.svg"
                            alt="blue_tick"
                            width={20}
                            height={20}
                        />
                    )}
                    <p
                        className={`font-semibold text-lg font-serif ${
                            task.status === "completed" ? "line-through" : ""
                        }`}
                    >
                        {task.title}
                    </p>
                </div>
                <p className="text-gray-600">
                    {truncateText(task.description, 60)}
                </p>
            </div>

            {/* Task Timing and Progress */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                    <IconText
                        src="/svg/clock.svg"
                        alt="clock"
                        text={
                            task.status === "completed"
                                ? `Finished in ${hoursPassed}h ${minutesPassed}m`
                                : `${hoursPassed}h ${minutesPassed}m passed`
                        }
                        textStyle={`${
                            task.status === "completed" ? "text-green-500" : ""
                        } font-semibold`}
                    />
                    <p
                        className={`${
                            task.status === "overdue" ? "text-red-500" : ""
                        }`}
                    >
                        {task.status === "overdue"
                            ? `${hoursLate}h ${minutesLate}m late`
                            : `${hoursLeft}h ${minutesLeft}m left`}
                    </p>
                </div>
                <ProgressBar progress={percentagePassed} />
            </div>

            {/* Task Footer */}
            <div className="flex justify-between text-sm">
                <IconText
                    src="/svg/user.svg"
                    alt={task.assignee.user_name}
                    text={task.assignee.user_name}
                    width={25}
                    height={25}
                />
                <div className="flex gap-2">
                    <IconText src="/svg/comment.svg" alt="comments" text="12" />
                    <IconText
                        src="/svg/attachment.svg"
                        alt="attachments"
                        text="0"
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
