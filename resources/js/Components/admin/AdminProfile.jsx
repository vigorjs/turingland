import { router } from "@inertiajs/react";
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
                        src={imgSrc}
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form onSubmit={handleLogout}>
                        <button>Log out</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AdminProfile;
