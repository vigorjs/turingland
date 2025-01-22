import { Link, usePage, router } from "@inertiajs/react";
import { LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
    FaHome,
    FaBars,
    FaBuilding,
    FaUnsplash,
    FaSlidersH,
    FaHospitalUser,
    FaChartArea,
    FaMapMarked,
    FaRegWindowMaximize,
    FaComment,
    FaUserTie,
    FaUsers,
} from "react-icons/fa";
import ApplicationLogo from "../ApplicationLogo";

const sidebarLinks = [
    {
        section: "Menu",
        links: [
            { name: "Dashboard", namedRoute: "dashboard", icon: <FaHome /> },
        ],
    },
    {
        section: "Property Management",
        links: [
            {
                name: "Property",
                namedRoute: "dashboard.property",
                icon: <FaBuilding />,
            },
            {
                name: "Category",
                namedRoute: "dashboard.category",
                icon: <FaUnsplash />,
            },
            {
                name: "Developer",
                namedRoute: "dashboard.developer",
                icon: <FaHospitalUser />,
            },
            {
                name: "Area",
                namedRoute: "dashboard.area",
                icon: <FaChartArea />,
            },
            {
                name: "Location",
                namedRoute: "dashboard.location",
                icon: <FaMapMarked />,
            },
        ],
    },
    {
        section: "CMS",
        links: [
            {
                name: "Banner",
                namedRoute: "dashboard.banner",
                icon: <FaRegWindowMaximize />,
            },
            {
                name: "Testimony",
                namedRoute: "dashboard.testimony",
                icon: <FaComment />,
            },
            {
                name: "Web Preferences",
                namedRoute: "dashboard.web-preferences",
                icon: <FaSlidersH />,
            },
        ],
    },
    {
        section: "User Management",
        links: [
            {
                name: "Agent",
                namedRoute: "dashboard.agent",
                icon: <FaUserTie />,
            },
            {
                name: "Customer",
                namedRoute: "dashboard.customer",
                icon: <FaUsers />,
            },
        ],
    },
];

const Sidebar = ({ isCollapsed, user }) => {
    const { url } = usePage();
    const [isMobileOpen, setIsMobileOpen] = useState(isCollapsed);

    const toggleSidebar = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"));
    };
    String.prototype.replaceAt = function (index, replacement) {
        return (
            this.substring(0, index) +
            replacement +
            this.substring(index + replacement.length)
        );
    };

    const isActive = (namedRoute) =>
        url ===
        `/${
            namedRoute == "dashboard"
                ? namedRoute
                : namedRoute.replaceAt(9, "/")
        }`;

    const roleAccess = {
        admin: [
            "Dashboard",
            "Property",
            "Category",
            "Developer",
            "Area",
            "Location",
            "Banner",
            "Testimony",
            "Web Preferences",
            "Agent",
            "Customer",
        ],
        agent: ["Property"],
        customer: [],
    };

    const filteredSidebarLinks = sidebarLinks
        .map(({ section, links }) => ({
            section,
            links: links.filter(({ name }) =>
                roleAccess[user.role]?.includes(name)
            ),
        }))
        .filter(({ links }) => links.length > 0);

    console.log(url);

    return (
        <div className="h-screen overflow-hidden">
            <div
                className={`bg-[#222222] text-white rounded-none md:rounded-2xl px-4 py-6 h-full flex flex-col shadow-lg transition-all duration-300 overflow-y-auto ${
                    isMobileOpen ? "w-[80px]" : "w-[270px]"
                }`}
            >
                <div className="mb-5 flex justify-center items-center flex-col gap-3 sticky top-0 bg-[#222222] z-10">
                    <ApplicationLogo />
                    <button
                        className="bg-[#222222] text-white p-2 rounded-full px-4"
                        onClick={toggleSidebar}
                    >
                        <FaBars size={20} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-between min-h-0">
                    <div className="overflow-y-auto flex-1">
                        {filteredSidebarLinks.map(({ section, links }) => (
                            <div key={section} className="mb-4">
                                {!isMobileOpen && (
                                    <h2 className="text-[#979797] text-[14px] uppercase mb-2 sticky top-0">
                                        {section}
                                    </h2>
                                )}
                                {links.map(({ name, namedRoute, icon }) => (
                                    <Link
                                        key={namedRoute}
                                        href={route(namedRoute)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                            isActive(namedRoute)
                                                ? "bg-white text-[#222222]"
                                                : "text-white hover:bg-gray-700"
                                        }`}
                                    >
                                        <span className="text-xl">{icon}</span>
                                        {!isMobileOpen && (
                                            <span className="font-bold text-[15px]">
                                                {name}
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="sticky bottom-0 bg-[#222222] pt-4">
                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                                isMobileOpen
                                    ? "justify-center"
                                    : "justify-start hover:bg-gray-700"
                            }`}
                        >
                            <span className="text-xl">{<LogOutIcon />}</span>
                            {!isMobileOpen && (
                                <span className="font-bold text-[15px]">
                                    Logout
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
