import { ThemeToggle } from "@/Components/ThemeToggle";
import { Button } from "@/Components/ui/button";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Button variant={"orange"}>das</Button>
                <ThemeToggle>ini buat theme</ThemeToggle>
            </div>
        </>
    );
}
