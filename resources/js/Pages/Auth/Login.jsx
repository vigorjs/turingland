import ApplicationLogo from "@/Components/ApplicationLogo";
import { LoginForm } from "@/Components/auth/login-form";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";


export default function Login({
    status,
    canResetPassword,
    className,
    imageBackground,
    auth,
    ...props
}) {

    const [currentImgLogin, setCurrentImgLogin] = useState(null);

    useEffect(() => {
        const fetchImage = async (key, setter) => {
            try {
                const response = await axios.get(
                    route("web-preferences.get", { key })
                );
                setter(response.data.value); // Menyimpan path ke state
            } catch (error) {
                console.error(`Error fetching current ${key}:`, error);
            }
        };


        fetchImage("img_login_url", setCurrentImgLogin);

    }, []);
    return (
        <AuthLayout auth={auth} >
            <Head title="Login" />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-muted">
                <div className="flex items-center justify-center">
                    <div className="mx-auto grid w-[350px] gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                        </div>

                        <LoginForm />
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img
                        src={
                            currentImgLogin
                                ? `/storage/${currentImgLogin}`
                                : "https://placehold.co/1920x1080?text=Your+Brand+Here"
                        }
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </AuthLayout>
    );
}
