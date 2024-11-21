import IconWithButton from "@/components/reusable/IconWithButton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { Divider } from "../newTask/AddNewTaskModal";
import TaskContentSection from "./TaskContentSection";
import TaskStatusSection from "./TaskStatusSection";

type Props = {
    isOpen: boolean;
    handleInfoDialogOpenClose: () => void;
};

const TaskInfoContainer: React.FC<Props> = ({
    isOpen,
    handleInfoDialogOpenClose,
}) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen}>
            <DialogContent className="bg-taskContainer_dark w-[70%] overflow-hidden h-[90%] rounded-2xl p-0 text-white border-none focus:invisible">
                <DialogHeader className="p-0 space-y-0 flex-none h-full">
                    <DialogTitle className="font-normal px-4 pt-4 pb-2.5">
                        <div className="flex justify-between">
                            <div className="flex items-center justify-center gap-3">
                                <Image
                                    src={"/svg/close.svg"}
                                    alt="close image"
                                    width={20}
                                    height={20}
                                    className="cursor-pointer"
                                    onClick={handleInfoDialogOpenClose}
                                />
                                <div className="flex flex-col items-start">
                                    <p className="font-serif text-lg">
                                        Task for
                                    </p>
                                    <p className="text-sm">You</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconWithButton
                                    src="/svg/link.svg"
                                    alt="link image"
                                    customClassName="bg-[#23252D] border border-[#50515B] hover:bg-[#3a3c42] p-2 rounded-full"
                                    // handleClick={handleSearchClick} // Focus input when icon is clicked
                                />
                                <IconWithButton
                                    src="/svg/menu.svg"
                                    alt="menu image"
                                    customClassName="bg-[#23252D] border border-[#50515B] hover:bg-[#3a3c42] p-2 rounded-full"
                                    // handleClick={handleSearchClick} // Focus input when icon is clicked
                                />
                            </div>
                        </div>
                    </DialogTitle>
                    <Divider />
                    <div className="flex flex-row h-full w-full">
                        <div className="basis-5/6 h-full">
                            <TaskContentSection />
                        </div>

                        <div className="basis-2/6 bg-[#1E212A]">
                            <TaskStatusSection />
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default TaskInfoContainer;
