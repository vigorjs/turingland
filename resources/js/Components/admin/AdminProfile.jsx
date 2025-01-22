import { Link, router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AdminProfile = ({ imgSrc, name, email, isCollapsed }) => {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 border border-gray-300 bg-white rounded-lg px-2 py-1 cursor-pointer">
                    {/* Profile Image */}
                    <img
                        src={imgSrc ?? "https://avatar.iran.liara.run/public"}
                        alt="Profile"
                        className="w-[36px] h-[36px] rounded-full border border-gray-300"
                    />

                    {/* Profile Info (Sembunyikan di layar kecil) */}
                    {!isCollapsed && (
                        <div className="pr-4">
                            <p className="text-[15px] text-black font-bold">
                                {name}
                            </p>
                            <p className="text-[10px] text-black">{email}</p>
                        </div>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {/* <DropdownMenuLabel>{name}</DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
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
};

export default AdminProfile;
