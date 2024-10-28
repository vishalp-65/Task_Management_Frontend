// src/components/AppContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthStore } from "@/store/authStore";
import { Toaster } from "./ui/toaster";
import { Loading } from "./Loading";
import SideBar from "./SideBar";

interface AppContainerProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const AppContainer: React.FC<AppContainerProps> = ({
    children,
    allowedRoles,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, checkAuthStatus, isLoading } = useAuthStore();
    const hasCheckedAuth = useRef(false);
    const [isClient, setIsClient] = useState(false); // Track client render

    // Wait for client render to avoid hydration errors
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Check auth only once on initial render
    useEffect(() => {
        if (!hasCheckedAuth.current) {
            checkAuthStatus();
            hasCheckedAuth.current = true;
        }
    }, [checkAuthStatus]);

    // Redirect logic (only runs on the client)
    useEffect(() => {
        if (isClient && !isLoading) {
            // Only redirect after initial client render
            if (!user && pathname !== "/auth/login") {
                router.push("/auth/login");
            } else if (user && pathname === "/auth/login") {
                router.push("/");
            } else if (
                user &&
                allowedRoles.length > 0 &&
                !allowedRoles.includes(user.role)
            ) {
                router.push("/unauthorized");
            }
        }
    }, [user, pathname, allowedRoles, isLoading, router, isClient]);

    // Render loading screen if still loading or if server-rendering
    if (!isClient || isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col items-center justify-between min-h-screen text-white">
            <Navbar />
            <SideBar />
            <main className="app-content">{children}</main>
            {/* <Footer /> */}
            <Toaster />
        </div>
    );
};

export default AppContainer;
