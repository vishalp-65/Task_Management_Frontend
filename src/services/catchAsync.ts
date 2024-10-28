// src/services/catchAsync.ts
export const catchAsync = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
        return await fn();
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};
