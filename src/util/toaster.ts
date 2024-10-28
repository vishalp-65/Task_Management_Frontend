// src/utils/toaster.ts

export const toaster = (toast: any) => {
    return (title: string, description?: string) => {
        console.log("Toasted");
        toast({
            title,
            description,
        });
    };
};
