import { Link } from "@inertiajs/react";
import {
    ChevronDown,
    ChevronDownIcon,
    ChevronUpIcon,
    Menu,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import ApplicationLogo from "./ApplicationLogo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import ProfileDropdown from "./user/ProfileDropdown";

const Header = ({ variant, auth, areas, categories }) => {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [variants, setVariants] = useState(variant);

    console.log("auth: ", auth);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    // Handle scroll to change header background
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const buyAreaMenu = areas.reduce((acc, area) => {
        const firstWord = area?.location?.name;
        const existingArea = acc.find((item) => item.title === firstWord);

        const areaObj = {
            name: `Rumah Dijual di ${area.name}`,
            url: `/search?type=sale&area_id=${area.id}`,
        };

        if (existingArea) {
            existingArea.bodies.push(areaObj);
        } else {
            acc.push({
                title: firstWord,
                bodies: [areaObj],
            });
        }

        return acc;
    }, []);

    const rentAreaMenu = areas.reduce((acc, area) => {
        const firstWord = area?.location?.name;
        const existingArea = acc.find((item) => item.title === firstWord);

        const areaObj = {
            name: `Rumah Disewa di ${area.name}`,
            url: `/search?type=rent&area_id=${area.id}`,
        };

        if (existingArea) {
            existingArea.bodies.push(areaObj);
        } else {
            acc.push({
                title: firstWord,
                bodies: [areaObj],
            });
        }

        return acc;
    }, []);

    console.log("buyAreaMenu: ", buyAreaMenu);

    const menuItems = [
        { title: "Home", url: "/" },
        {
            title: "Dijual",
            subItems: buyAreaMenu,
        },
        {
            title: "Disewa",
            subItems: rentAreaMenu,
        },
        { title: "Cari rumah", url: "/search" },
        // { title: "KPR" },
        // { title: "Panduan" },
    ];

    const img1 =
        "https://tpc.googlesyndication.com/simgad/14660764323637582121?";

    return (
        <header
            className={`z-20 w-full transition-all duration-300 ease-in-out ${
                variants === "sticky"
                    ? `fixed top-0 ${
                          isScrolled
                              ? "bg-primary dark:bg-muted shadow backdrop-blur-md"
                              : "bg-black/30 backdrop-blur-md"
                      }`
                    : "bg-primary dark:bg-muted"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <ApplicationLogo className="flex-shrink-0" />

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="flex space-x-4">
                            {menuItems.map((item, index) => (
                                <div
                                    key={`menu-desktop-${index}`}
                                    className="relative py-4"
                                    onMouseEnter={() =>
                                        setHoveredMenu(item.title)
                                    }
                                    onMouseLeave={() => setHoveredMenu(null)}
                                >
                                    {item.subItems ? (
                                        <button
                                            className={`${
                                                hoveredMenu === item.title
                                                    ? "text-white font-medium"
                                                    : "text-white/85"
                                            } flex items-center px-3 py-2 text-sm  hover:text-white`}
                                        >
                                            {item.title}
                                            {item.subItems &&
                                                (hoveredMenu === item.title ? (
                                                    <ChevronUpIcon className="ml-1 h-4 w-4" />
                                                ) : (
                                                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                                                ))}
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.url}
                                            className="flex items-center px-3 py-2 text-sm text-white/90 hover:text-white hover:font-medium"
                                        >
                                            {item.title}
                                        </Link>
                                    )}

                                    {/* Desktop Dropdown */}
                                    {item.subItems &&
                                        hoveredMenu === item.title && (
                                            <div className="fixed top-13 left-0 mt-2 w-full bg-white border border-gray-200 rounded-b-2xl shadow-lg z-50 flex p-8 max-h-[310px] overflow-y-scroll">
                                                <div className="w-[15%]">
                                                    <img
                                                        src={img1}
                                                        alt=""
                                                        className="w-full aspect-square rounded-2xl"
                                                    />
                                                </div>
                                                <div className="w-[85%]">
                                                    <div className="px-4 mb-4">
                                                        <h1 className="text-xl border-b border-neutral-300 font-semibold pb-2">
                                                            {item.title}
                                                        </h1>
                                                    </div>
                                                    {/* <div className="flex flex-wrap justify-start gap-6 px-4"> */}
                                                    <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 justify-start gap-6 px-4">
                                                        {item.subItems.map(
                                                            (
                                                                subItem,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={`sub-desktop-menu-${index}`}
                                                                >
                                                                    <h3 className="font-medium text-gray-900 mb-2">
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </h3>
                                                                    <div className="space-y-2">
                                                                        {subItem.bodies.map(
                                                                            (
                                                                                body,
                                                                                index
                                                                            ) => (
                                                                                <Link
                                                                                    key={`sub-desktop-menu-body-${index}`}
                                                                                    href={
                                                                                        body.url
                                                                                    }
                                                                                    className="block text-sm text-gray-600 hover:text-primary"
                                                                                >
                                                                                    {
                                                                                        body.name
                                                                                    }
                                                                                </Link>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link href={route("dashboard")}>
                            <Button className="bg-white hover:bg-white text-primary px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-bold">
                                <HiOutlineSpeakerphone className="text-xs sm:text-sm" />
                                Pasang Iklan
                            </Button>
                        </Link>
                        {!auth ? (
                            <Link
                                href={route("login")}
                                className="text-white/90 hover:text-white text-sm font-medium hidden sm:block"
                            >
                                Akun
                            </Link>
                        ) : (
                            <ProfileDropdown auth={auth} />
                        )}
                        <ThemeToggle />
                        <button
                            className="lg:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" color="white" />
                            ) : (
                                <Menu className="h-6 w-6" color="white" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item, index) => (
                                <div key={`mobile-menu-${index}`}>
                                    <button
                                        onClick={() =>
                                            setHoveredMenu(
                                                hoveredMenu === item.title
                                                    ? null
                                                    : item.title
                                            )
                                        }
                                        className="w-full text-left px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-50 rounded-md flex items-center justify-between"
                                    >
                                        {item.title}
                                        {item.subItems && (
                                            <ChevronDown className="h-4 w-4" />
                                        )}
                                    </button>

                                    {/* Mobile Dropdown */}
                                    {item.subItems &&
                                        hoveredMenu === item.title && (
                                            <div className="mt-2 space-y-2 border-b border-white">
                                                {item.subItems.map(
                                                    (subItem, index) => (
                                                        <div
                                                            key={`sub-mobile-menu-${index}`}
                                                            className="px-4 "
                                                        >
                                                            <h3 className="font-medium text-white mb-2">
                                                                {subItem.title}
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {subItem.bodies.map(
                                                                    (
                                                                        body,
                                                                        index
                                                                    ) => (
                                                                        <Link
                                                                            key={`sub-mobile-menu-body-${index}`}
                                                                            href={
                                                                                body.url
                                                                            }
                                                                            className="block text-sm text-white hover:text-primary py-1"
                                                                        >
                                                                            {
                                                                                body.name
                                                                            }
                                                                        </Link>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                            {!auth && (
                                <Link
                                    href={route("login")}
                                    className="w-full text-left px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-50 rounded-md lg:hidden"
                                >
                                    Akun
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
