import { Check } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Divider } from "../newTask/AddNewTaskModal";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/util/helper";

const TaskContentSection = () => {
    const [isCheck, setIsCheck] = useState<boolean>(false);
    const [currentTaskInfoMode, setCurrentTaskInfoMode] = useState<
        "comments" | "history"
    >("comments");

    const renderStatusButton = (status: "comments" | "history") => (
        <p
            className={`rounded-full w-24 px-1 text-center py-1.5 cursor-pointer ${
                currentTaskInfoMode === status ? "bg-blue" : "bg-black"
            }`}
            onClick={() => setCurrentTaskInfoMode(status)}
        >
            {capitalizeFirstLetter(status)}
        </p>
    );

    return (
        <div className="px-4 py-5 overflow-hidden">
            <div className="flex items-start justify-start gap-4 mb-6">
                <div className="flex items-start mt-1.5">
                    <div
                        className={`w-4 h-4 rounded-full cursor-pointer flex items-center justify-center p-0.5 ${
                            isCheck
                                ? "bg-blue"
                                : "bg-transparent border-white border"
                        }`}
                        onClick={() => setIsCheck(!isCheck)}
                    >
                        {isCheck && <Check />}
                    </div>
                </div>
                <div className="flex items-start flex-col justify-center gap-1.5">
                    <p className="font-semibold font-serif text-lg">
                        New Inventories Added
                    </p>
                    <div
                        className={`flex items-center gap-1 px-1.5 rounded-full text-white text-sm bg-red-400`}
                    >
                        <Image
                            src={"/svg/alert.svg"}
                            alt="icon"
                            width={15}
                            height={15}
                        />
                        <p>SLA Breached</p>
                    </div>
                    <p className="text-gray-400 text-sm text-wrap">
                        Call Rancho & inform about the upcoming new inventories
                        to them and update its stage and status once you
                        contacted them.
                    </p>
                </div>
            </div>

            <Divider />

            <div className="mt-6 h-[125px] border border-gray-500 rounded-lg bg-gray-700 p-3 flex flex-col">
                <div className="flex basis-2/3">
                    <textarea
                        placeholder="Write a comment"
                        className={` placeholder:font-serif bg-transparent outline-none border-none resize-none focus:ring-0 text-white w-full`}
                    />
                </div>
                <div className="basis-1/3 flex items-center justify-end gap-4">
                    <Image
                        src={"/svg/attachment.svg"}
                        alt="attachment image"
                        className="filter invert brightness-0 cursor-pointer"
                        width={22}
                        height={22}
                    />
                    <Image
                        src={"/svg/mic.svg"}
                        alt="mic image"
                        className="filter invert brightness-0 cursor-pointer"
                        width={22}
                        height={22}
                    />
                    <Button className="rounded-full px-6">PUBLISH</Button>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex items-center bg-black rounded-full text-sm w-fit">
                    {renderStatusButton("comments")}
                    {renderStatusButton("history")}
                </div>
            </div>

            <div className="w-full h-full flex items-center justify-center">
                <div>
                    <Image
                        src={"/svg/empty_comment.svg"}
                        alt="empty comment"
                        width={200}
                        height={200}
                    />
                    <p className="font-serif text-2xl font-semibold">
                        No comments yet!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskContentSection;
