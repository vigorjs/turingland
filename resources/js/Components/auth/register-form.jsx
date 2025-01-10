"use client";

import { useEffect, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
    EyeIcon,
    EyeOffIcon,
    LoaderIcon,
    LogInIcon,
    UserRoundPlusIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export function RegisterForm({ imageUrl }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post(route("register"), {
            onError: (errors) => {
                setIsLoading(false);
                toast({
                    title: "Registration Failed",
                    description: errors.email || errors.password,
                    variant: "destructive",
                });
            },
            onSuccess: () => {
                setIsLoading(false);
                toast({
                    title: "Registration Success 🎉",
                    description: "You have successfully registered",
                    variant: "default",
                });
            },
            onFinish: () => setIsLoading(false),
        });
    };

    const handleGoogleSignup = () => {
        // Tambahkan logika untuk sign up dengan Google
        window.location.href = route("auth.google");
    };

    return (
        <Card className="overflow-hidden">
            <CardContent className="grid p-0">
                <form onSubmit={submit} className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">Sign Up</h1>
                            <p className="text-balance text-muted-foreground">
                                Welcome to Turingland
                            </p>
                        </div>
                        <hr />
                        {/* Input Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Your Name"
                                name="name"
                                value={data.name}
                                type="text"
                                autoCapitalize="words"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        {/* Input Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                name="email"
                                value={data.email}
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        {/* Input Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    type={showPassword ? "text" : "password"}
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoCorrect="off"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        {/* Input Password Confirmation */}
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                type={showPassword ? "text" : "password"}
                                autoCapitalize="none"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <Button
                            variant="orange"
                            type="submit"
                            className="w-full text-white"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Register
                            <LogInIcon className="ml-2 h-4 w-4" />
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="orange"
                                className="w-full"
                                onClick={handleGoogleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <FaGoogle
                                        className=" h-4 w-4"
                                        color="white"
                                    />
                                )}
                            </Button>
                            <Link
                                href={route("login")}
                                className={cn(
                                    "flex items-center justify-center hover:bg-muted rounded-md",
                                    Button.defaultProps?.className
                                )}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <LogInIcon className="mr-2 h-4 w-4" />
                                )}
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
