// src/hooks/useErrorToast.ts
import { useToast } from "@/hooks/use-toast";

export const useErrorToast = () => {
    const { toast } = useToast();

    const showErrorToast = (error: any) => {
        const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong. Please try again.";

        toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
        });
    };

    return showErrorToast;
};
