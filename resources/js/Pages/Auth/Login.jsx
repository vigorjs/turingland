import { LoginForm } from "@/Components/auth/login-form";
import UserAuthForm from "@/Components/auth/UserAuthForm";
import GuestLayout from "@/Layouts/GuestLayout";
import { cn } from "@/lib/utils";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({
    status,
    canResetPassword,
    className,
    ...props
}) {
    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {/* <UserAuthForm /> */}
            <div className="flex min-h-[90vh] flex-col items-center justify-center bg-muted dark:bg-background ">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div
                        className={cn("flex flex-col gap-6", className)}
                        {...props}
                    >
                        <LoginForm imageUrl={"https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"} />

                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            By clicking continue, you agree to our{" "}
                            <a href="#">Terms of Service</a> and{" "}
                            <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
