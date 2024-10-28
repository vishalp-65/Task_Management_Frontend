// src/components/AppContainer.tsx
import React, { useEffect } from "react";
import "./../app/globals.css";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthStore } from "@/store/authStore";
import { Toaster } from "./ui/toaster";
import { Loading } from "./Loading";

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

    // Run `checkAuthStatus` only once on initial render
    useEffect(() => {
        console.log("calling checkAuth");
        checkAuthStatus();
    }, [checkAuthStatus]);

    // Handle redirection based on authentication and authorization
    useEffect(() => {
        if (!isLoading) {
            if (!user && pathname !== "/auth/login") {
                router.push("/auth/login");
            } else if (
                user &&
                allowedRoles.length > 0 &&
                !allowedRoles.includes(user.role)
            ) {
                router.push("/unauthorized");
            } else if (user) {
                router.push("/");
            }
        }
    }, [user, pathname, allowedRoles, isLoading, router]);

    // Render a loading screen if `isLoading` is true
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="">
            <div className="flex flex-col items-center justify-between min-h-screen px-2 bg-gray-800">
                <Navbar />
                {/* Always render children regardless of authentication */}
                <main className="app-content">{children}</main>
                <Footer />
            </div>
            <Toaster />
        </div>
    );
};

export default AppContainer;
