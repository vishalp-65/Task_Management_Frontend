import { localStorageConstant } from "@/constant/constant";

export const config = {
    BASE_URL:
        (process.env.NEXT_PUBLIC_API_BASE_URL as string) ||
        "http://localhost:8082/api/v1",
    TOKEN: null as string | null, // Initialize as null
};

// Function to retrieve the token on the client-side
export const getToken = (): string | null => {
    let token = null;
    if (typeof window !== "undefined") {
        token = window.localStorage.getItem(localStorageConstant.JWT_TOKEN);
    }
    console.log("token is ", token);
    return token;
};
