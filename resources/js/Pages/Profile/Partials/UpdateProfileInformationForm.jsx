import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { toast } from "@/hooks/use-toast";
import { Transition } from "@headlessui/react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            wa_number: user.wa_number || "",
            photo: user.photo || null,
        });

    const [photoPreview, setPhotoPreview] = useState(
        user.photo && user.photo.includes("photos")
            ? `/storage/${user.photo}`
            : null
    );

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("wa_number", data.wa_number);
        formData.append("photo", data.photo);
        formData.append("_method", "PATCH");

        router.post("/dashboard/profile", formData, {
            onError: (errors) => {
                toast({
                    title: "Profile update Failed!",
                    description: errors?.name || errors?.icon,
                    variant: "destructive",
                });
            },
            onSuccess: () => {
                toast({
                    title: `Profile updated Sucessfully!`,
                    variant: "default",
                });
            },
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData("photo", file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="wa_number" value="Phone Number" />
                    <TextInput
                        id="wa_number"
                        className="mt-1 block w-full"
                        value={data.wa_number}
                        onChange={(e) => setData("wa_number", e.target.value)}
                        autoComplete="tel"
                    />
                    <InputError className="mt-2" message={errors.wa_number} />
                </div>

                <div>
                    <InputLabel htmlFor="photo" value="Photo" />
                    <input
                        id="photo"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={handlePhotoChange}
                        accept="image/*"
                    />
                    {photoPreview && (
                        <div className="mt-2">
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="w-32 shadow"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setPhotoPreview(null);
                                    setData("photo", null);
                                }}
                                className="text-primary font-bold text-sm mt-2"
                            >
                                Remove photo?
                            </button>
                        </div>
                    )}
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
