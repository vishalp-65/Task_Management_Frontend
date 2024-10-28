// src/pages/_app.tsx
"use client";

import { AppProps } from "next/app";
import "./../app/globals.css";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import AppContainerWrapper from "@/components/AppContainerWrapper";

function MyApp({ Component, pageProps }: AppProps) {
    const { checkAuthStatus } = useAuthStore();

    // Check auth status on mount
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return (
        <AppContainerWrapper>
            <Component {...pageProps} />;
        </AppContainerWrapper>
    );
}

export default MyApp;
