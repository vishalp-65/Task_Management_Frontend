// src/pages/auth/register.tsx
import { useState } from "react";
// import "./../../app/globals.css";
import { useAuthStore } from "../../store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { isValidEmail } from "@/util/validateInput";
import { Loader2 } from "lucide-react";

const Register = () => {
    const { login, isLoading } = useAuthStore();
    const { toast } = useToast();
    const [form, setForm] = useState({
        email: "admin_ui@gmail.com", // For testing purpose
        password: "Admin@123",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Validate input values and show errors
    const validate = () => {
        const errors: { [key: string]: string } = {};
        if (form.password.length < 8)
            errors.password = "Password length should be greater then 8";
        if (!isValidEmail(form.email)) {
            errors.email = "Enter a valid email";
        }
        if (!form.email) errors.email = "Email is required.";
        if (!form.password) errors.password = "Password is required.";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle input change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Handle Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await login(form.email, form.password);
            if (res) {
                toast({
                    title: "Login successful",
                });
            } else {
                toast({
                    title: "Something went wrong",
                    variant: "destructive",
                });
            }
        } catch (err: any) {
            toast({
                title: "Error while logging in",
                description: err?.message || "Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="w-[380px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter you email and password for login.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between mt-2">
                <Button
                    className="w-full"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <p>Login</p>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Register;
