import { Link, usePage } from "@inertiajs/react";
import { FaHome, FaFileAlt, FaCog } from "react-icons/fa";

const Sidebar = ({ isCollapsed }) => {
    const { url } = usePage();

    const navigationLinks = [
        { name: "Nama Menu One", href: "/admin-page-one", icon: <FaHome /> },
        { name: "Nama Menu Two", href: "/admin-page-two", icon: <FaFileAlt /> },
        { name: "Nama Menu Three", href: "/admin-page-three", icon: <FaCog /> },
    ];

    return (
        <div
            className={`bg-[#222222] text-white rounded-none md:rounded-2xl px-4 py-6 flex flex-col shadow-lg transition-all duration-300 ${
                isCollapsed ? "w-[80px]" : "w-[270px]"
            }`}
        >
            {/* Logo */}
            <div className="mb-10 flex justify-center">
                <img
                    src="/assets/turinglandlogo.png"
                    alt="Turingland Yawn"
                    className={`transition-all duration-300 object-contain ${
                        isCollapsed ? "h-8" : "h-12"
                    }`}
                />
            </div>

            {/* Menu */}
            {!isCollapsed && (
                <h2 className="text-[#979797] text-[14px] uppercase mb-4">
                    Menu
                </h2>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === link.href
                                ? "bg-white text-[#222222]"
                                : "text-white hover:bg-gray-700"
                        }`}
                    >
                        <span className="text-xl">{link.icon}</span>
                        {!isCollapsed && (
                            <span className="font-bold text-[15px]">
                                {link.name}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
