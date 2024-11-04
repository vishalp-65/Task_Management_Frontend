// src/pages/auth/register.tsx

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
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

const Login = () => {
    const { login, isLoading } = useAuthStore();
    const { toast } = useToast();
    const [form, setForm] = useState({
        email: "admin_ui@gmail.com",
        password: "Admin@123",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!form.email) newErrors.email = "Email is required.";
        else if (!isValidEmail(form.email))
            newErrors.email = "Enter a valid email.";

        if (!form.password) newErrors.password = "Password is required.";
        else if (form.password.length < 8)
            newErrors.password = "Password length should be greater than 8.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await login(form.email, form.password);
            toast({
                title: res ? "Login successful" : "Something went wrong",
                variant: res ? undefined : "destructive",
            });
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
                    Enter your email and password to login.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="grid w-full gap-4">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
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
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Login"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Login;
