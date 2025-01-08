import UserAuthForm from "@/Components/auth/UserAuthForm";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    // const { data, setData, post, processing, errors, reset } = useForm({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });

    // const submit = (e) => {
    //     e.preventDefault();

    //     post(route('login'), {
    //         onFinish: () => reset('password'),
    //     });
    // };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <UserAuthForm />
        </GuestLayout>
    );
}
