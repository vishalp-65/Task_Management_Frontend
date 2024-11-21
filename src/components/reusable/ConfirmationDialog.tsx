import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type Props = {
    description: string;
    buttonName: string;
    isOpen: boolean;
    handleCloseDialog: () => void;
    handleConfirmClick: () => void;
};

const ConfirmationDialog: React.FC<Props> = ({
    description,
    buttonName,
    isOpen,
    handleCloseDialog,
    handleConfirmClick,
}) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen}>
            <DialogContent className="max-w-lg bg-taskContainer_dark rounded-xl focus:invisible border-none text-white">
                <DialogHeader className="flex flex-col items-center gap-5">
                    <DialogTitle className="text-2xl font-serif">
                        Are you sure?
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 text-center">
                        {description}
                    </DialogDescription>
                    <div className="flex items-center justify-between gap-5">
                        <Button
                            className="rounded-full px-6 bg-gray-500 hover:bg-gray-400 text-white"
                            onClick={handleCloseDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`rounded-full px-6 ${
                                buttonName === "DELETE"
                                    ? "bg-red-500 hover:bg-red-500/70"
                                    : ""
                            }`}
                            onClick={handleConfirmClick}
                        >
                            {buttonName}
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;
