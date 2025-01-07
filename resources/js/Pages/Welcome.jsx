import { ThemeToggle } from "@/Components/ThemeToggle";
import { Button } from "@/Components/ui/button";
import { Head, Link } from "@inertiajs/react";

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
