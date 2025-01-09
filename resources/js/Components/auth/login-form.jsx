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
    ChromeIcon,
    LoaderIcon,
    LogInIcon,
    UserRoundPlusIcon,
    EyeIcon,
    EyeOffIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({ imageUrl }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State untuk show/hide password
    const { toast } = useToast();

    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post(route("login"), {
            onError: (errors) => {
                setIsLoading(false);
                toast({
                    title: "Login Failed",
                    description: errors.email || errors.password,
                    variant: "destructive",
                });
            },
            onSuccess: () => {
                setIsLoading(false);
                toast({
                    title: "Login Success 🎉",
                    description: "You have successfully logged in",
                    variant: "default",
                });
            },
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <Card className="overflow-hidden">
            <CardContent className="grid p-0">
                <form onSubmit={submit} className="p-6 md:p-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-balance text-muted-foreground">
                                Login to Turingland
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                name="email"
                                value={data.email}
                                type="text"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                autoFocus={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href={route("password.request")}
                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    type={showPassword ? "text" : "password"} // Tipe dinamis
                                    autoCapitalize="none"
                                    autoComplete="current-password"
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
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData("remember", checked)
                                }
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
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
                            Login
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
                                href={route("register")}
                                className={cn(
                                    "flex items-center justify-center hover:bg-muted rounded-md",
                                    Button.defaultProps?.className
                                )}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <UserRoundPlusIcon className="mr-2 h-4 w-4" />
                                )}
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
