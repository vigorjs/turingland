import { Link, usePage, router } from "@inertiajs/react";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHome, FaFileAlt, FaCog, FaBars, FaRegBuilding, FaBuilding } from "react-icons/fa";
import ApplicationLogo from "../ApplicationLogo";

const Sidebar = ({ isCollapsed }) => {
    const { url } = usePage();
    const [isMobileOpen, setIsMobileOpen] = useState(isCollapsed);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <div
            className={`bg-[#222222] text-white rounded-none md:rounded-2xl px-4 py-6 min-h-full flex flex-col shadow-lg transition-all duration-300 ${
                isMobileOpen ? "w-[80px]" : "w-[270px]"
            }`}
        >
            {/* Logo */}
            <div
                className={`mb-5 flex justify-center items-center flex-col gap-3`}
            >
                <ApplicationLogo />
                <button
                    className="bg-[#222222] text-white p-2 rounded-full px-4"
                    onClick={toggleMobileSidebar}
                >
                    <FaBars size={20} />
                </button>
            </div>

            {/* Navigation Links */}

            <div className="flex flex-1 flex-col justify-between">
                <nav className="flex flex-col space-y-2">
                    {/* Menu */}
                    {!isMobileOpen && (
                        <h2 className="text-[#979797] text-[14px] uppercase">
                            Menu
                        </h2>
                    )}
                    <Link
                        href={route("dashboard")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaHome />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Dashboard
                            </span>
                        )}
                    </Link>
                    {/* Property Management */}
                    {!isMobileOpen && (
                        <h2 className="text-[#979797] text-[14px] uppercase mb-4">
                            Property Management
                        </h2>
                    )}
                    <Link
                        href={route("dashboard.property")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/property"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl fill-white">
                            <FaBuilding />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Property
                            </span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.category")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/category"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaFileAlt />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Category
                            </span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.developer")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/developer"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaCog />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Developer
                            </span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.area")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/area"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaCog />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">Area</span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.location")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/location"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaCog />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Location
                            </span>
                        )}
                    </Link>

                    {/* CMS */}
                    {!isMobileOpen && (
                        <h2 className="text-[#979797] text-[14px] uppercase mb-4">
                            CMS
                        </h2>
                    )}
                    <Link
                        href={route("dashboard.banner")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/banner"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaFileAlt />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Banner
                            </span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.testimony")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/testimony"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaFileAlt />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Testimony
                            </span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.web-preferences")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/web-preferences"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaCog />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Web Preferences
                            </span>
                        )}
                    </Link>

                    {/* User Management */}
                    {!isMobileOpen && (
                        <h2 className="text-[#979797] text-[14px] uppercase mb-4">
                            User Management
                        </h2>
                    )}
                    <Link
                        href={route("dashboard.agent")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/agent"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaFileAlt />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">Agent</span>
                        )}
                    </Link>
                    <Link
                        href={route("dashboard.customer")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === "/dashboard/customer"
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">
                            <FaFileAlt />
                        </span>
                        {!isMobileOpen && (
                            <span className="font-bold text-[15px]">
                                Customer
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition mt-4 ${
                        isMobileOpen
                            ? "justify-center"
                            : "justify-start hover:bg-gray-700"
                    }`}
                >
                    <span className="text-xl">{<LogOutIcon />}</span>
                    {!isMobileOpen && (
                        <span className="font-bold text-[15px]">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
