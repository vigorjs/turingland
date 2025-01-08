import { ThemeToggle } from "@/Components/ThemeToggle";
import { Button } from "@/Components/ui/button";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-center items-center h-screen">
                <Button variant={"orange"}>das</Button>
                <ThemeToggle>ini buat theme</ThemeToggle>
            </div>
        </>
    );
}
