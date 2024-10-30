// src/components/AppContainerWrapper.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AppContainer from "./AppContainer";
import { useAuthStore } from "@/store/authStore";

interface AppContainerWrapperProps {
    children: React.ReactNode;
}

const AppContainerWrapper: React.FC<AppContainerWrapperProps> = ({
    children,
}) => {
    const pathname = usePathname();
    const { user } = useAuthStore();

    // Define route roles here
    const routeRoles: Record<string, string[]> = {
        "/admin": ["ADMIN", "MG"],
        "/dashboard": ["ADMIN", "MG", "PO", "TO", "BO"],
    };

    const allowedRoles = routeRoles[pathname!] || [];

    return <AppContainer allowedRoles={allowedRoles}>{children}</AppContainer>;
};

export default AppContainerWrapper;
