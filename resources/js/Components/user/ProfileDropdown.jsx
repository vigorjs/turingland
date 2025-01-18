import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, router } from "@inertiajs/react";

export default function ProfileDropdown({ auth }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Profile Image */}
                <img
                    src={auth?.photo}
                    alt="Profile"
                    className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full border border-gray-300"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{auth?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link className="w-full" href={route("profile.edit")}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form onSubmit={handleLogout} className="w-full">
                        <button className="w-full text-start" type="submit">
                            Log out
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
