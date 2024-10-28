import { LogOut, Search, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";

type Props = {};

const Navbar = (props: Props) => {
    const { user, isLoading, logout } = useAuthStore();

    return (
        <div className="h-16 w-full border-b border-gray-500 p-2">
            <div className="flex justify-between items-center">
                <div className="flex items-start justify-start cursor-pointer">
                    <Image
                        src="/svg/logo.svg"
                        alt="Logo"
                        width={10}
                        height={10}
                        className="w-14 h-14"
                    />
                </div>
                {user && (
                    <div className="flex items-center justify-end gap-2 pr-2">
                        <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                            <Image
                                src="/svg/search.svg"
                                alt="search"
                                width={10}
                                height={10}
                                className="w-4 h-4"
                            />
                        </div>
                        <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer">
                            <Image
                                src="/svg/bell.svg"
                                alt="notification"
                                width={10}
                                height={10}
                                className="w-4 h-4"
                            />
                        </div>
                        <div className="cursor-pointer"></div>

                        <div className="cursor-pointer">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Image
                                        src="/svg/user.svg"
                                        alt="profile"
                                        width={10}
                                        height={10}
                                        className="w-9 h-9"
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="ml-5 mb-1 w-20 md:w-56">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>{user.user_name}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={logout}
                                        className="cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
