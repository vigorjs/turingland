import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import ApplicationLogo from "./ApplicationLogo";

const Header = ({ variant }) => {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [variants, setVariants] = useState(variant);

    // Handle scroll to change header background
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        {
            title: "Dijual",
            subItems: [
                {
                    region: "DKI Jakarta",
                    cities: [
                        "Rumah Dijual di Jakarta Selatan",
                        "Rumah Dijual di Jakarta Barat",
                        "Rumah Dijual di Jakarta Utara",
                        "Rumah Dijual di Jakarta Timur",
                        "Rumah Dijual di Jakarta Pusat",
                    ],
                },
                {
                    region: "Jawa Barat",
                    cities: [
                        "Rumah Dijual di Bandung",
                        "Rumah Dijual di Bekasi",
                        "Rumah Dijual di Bogor",
                        "Rumah Dijual di Depok",
                        "Rumah Dijual di Cimahi",
                    ],
                },
            ],
        },
        { title: "Disewa" },
        { title: "Properti Baru" },
        { title: "KPR" },
        { title: "Panduan" },
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
                            {menuItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="relative py-4"
                                    onMouseEnter={() =>
                                        setHoveredMenu(item.title)
                                    }
                                    onMouseLeave={() => setHoveredMenu(null)}
                                >
                                    <button className="flex items-center px-3 py-2 text-sm font-medium text-white/90 hover:text-white">
                                        {item.title}
                                        {item.subItems && (
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        )}
                                    </button>

                                    {/* Desktop Dropdown */}
                                    {item.subItems &&
                                        hoveredMenu === item.title && (
                                            <div className="fixed top-13 left-0 mt-2 w-full bg-white border border-gray-200 rounded-b-2xl shadow-lg z-50 flex p-8">
                                                <div className="">
                                                    <img
                                                        src={img1}
                                                        alt=""
                                                        className="aspect-square rounded-2xl"
                                                    />
                                                </div>
                                                <div className="flex flex-wrap justify-start gap-6 px-4">
                                                    {item.subItems.map(
                                                        (subItem) => (
                                                            <div
                                                                key={
                                                                    subItem.region
                                                                }
                                                            >
                                                                <h3 className="font-medium text-gray-900 mb-2">
                                                                    {
                                                                        subItem.region
                                                                    }
                                                                </h3>
                                                                <div className="space-y-2">
                                                                    {subItem.cities.map(
                                                                        (
                                                                            city
                                                                        ) => (
                                                                            <a
                                                                                key={
                                                                                    city
                                                                                }
                                                                                href="#"
                                                                                className="block text-sm text-gray-600 hover:text-primary"
                                                                            >
                                                                                {
                                                                                    city
                                                                                }
                                                                            </a>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Button className="bg-white hover:bg-white text-primary px-4 py-2 rounded-md text-sm font-bold">
                            <HiOutlineSpeakerphone />
                            Pasang Iklan
                        </Button>
                        <button className="text-white/90 hover:text-white text-sm font-medium hidden sm:block">
                            Akun
                        </button>
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
                            {menuItems.map((item) => (
                                <div key={item.title}>
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
                                                    (subItem) => (
                                                        <div
                                                            key={subItem.region}
                                                            className="px-4 "
                                                        >
                                                            <h3 className="font-medium text-white mb-2">
                                                                {subItem.region}
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {subItem.cities.map(
                                                                    (city) => (
                                                                        <a
                                                                            key={
                                                                                city
                                                                            }
                                                                            href="#"
                                                                            className="block text-sm text-white hover:text-primary py-1"
                                                                        >
                                                                            {
                                                                                city
                                                                            }
                                                                        </a>
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
                            <button className="w-full text-left px-3 py-2 text-base font-medium text-white hover:text-primary hover:bg-gray-50 rounded-md lg:hidden">
                                Akun
                            </button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
