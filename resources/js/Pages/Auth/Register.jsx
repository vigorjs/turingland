import ApplicationLogo from "@/Components/ApplicationLogo";
import { RegisterForm } from "@/Components/auth/register-form";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";

export default function Register({
    status,
    canResetPassword,
    className,
    imageBackground,
    auth,
    webPreferences,
    ...props
}) {

    const imgRegisterUrl = webPreferences?.find(pref => pref.key === 'img_register_url')?.value;

    return (
        <AuthLayout auth={auth}>
            <Head title="Register" />
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

                        <RegisterForm />
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img
                        src={imgRegisterUrl ? `/storage/${imgRegisterUrl}` : "https://placehold.co/1920x1080?text=Your+Brand+Here"}
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
