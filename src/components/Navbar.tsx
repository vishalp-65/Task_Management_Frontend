// src/components/Navbar.tsx

import { LogOut, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/authStore";
import IconWithButton from "./reusable/IconWithButton";

const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <div className="h-16 w-full border-b border-gray-500 py-2 px-4 flex justify-between items-center">
            <Image
                src="/svg/logo.svg"
                alt="Logo"
                width={56}
                height={56}
                className="cursor-pointer"
            />

            {user && (
                <div className="flex items-center gap-2">
                    <IconWithButton
                        src="/svg/search.svg"
                        alt="search"
                        customClassName="bg-icon_bg"
                    />
                    <IconWithButton
                        src="/svg/bell.svg"
                        alt="Notification"
                        customClassName="bg-icon_bg"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Image
                                src="/svg/user.svg"
                                alt="profile"
                                width={36}
                                height={36}
                                className="w-9 h-9 cursor-pointer"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="ml-5 mb-1 w-20 md:w-56">
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>{user.user_name}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
};

export default Navbar;
