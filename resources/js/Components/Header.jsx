import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/useTheme";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
    const { theme } = useTheme  ();
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {
            title: "Dijuala",
            subItems: [
                {
                    region: "DKI ",
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
        <div className="w-full bg-primary shadow">
            <nav className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-auto"
                            src="/assets/turinglandlogo.png"
                            alt="Logo"
                        />
                    </div>

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
                        {/* <div className="flex">
                            <button className="text-white hover:text-white text-sm font-medium hidden sm:block">
                                <VscAccount />
                            </button>
                            <ThemeToggle />
                        </div> */}
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
        </div>
    );
};

export default Navbar;

// import { useEffect, useState } from "react";
// import { ThemeToggle } from "@/Components/ThemeToggle";
// import { navigationLinks } from "@/const/NavigationLink";
// import { useTheme } from "@/hooks/useTheme";
// import { Link } from "@inertiajs/react";
// import { ChevronRight } from "lucide-react";
// import { FaBars, FaTimes } from "react-icons/fa";

// const Header = () => {
//     const { theme } = useTheme();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

//     const toggleMenu = () => setMenuOpen(!menuOpen);

//     // Handle scroll to change header background
//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <header
//             className={`fixed top-0 w-full z-20 h-[102px] flex items-center transition-all duration-300 ${
//                 isScrolled
//                     ? "bg-primary shadow-md dark:bg-[#282828]"
//                     : "bg-transparent dark:bg-[#282828]"
//             }`}
//         >
//             <div className="flex items-center justify-between px-3 md:px-4 lg:px-[200px] w-full h-full">
//                 {/* Logo */}
//                 <Link
//                     href="/"
//                     className="flex items-center hover:opacity-90 transition-opacity"
//                 >
//                     {theme === "dark" ? (
//                         <img
//                             src="/assets/turinglandlogodark.png"
//                             alt="Application Logo"
//                             className="h-auto w-auto"
//                         />
//                     ) : (
//                         <img
//                             src="/assets/turinglandlogo.png"
//                             alt="Application Logo"
//                             className="h-auto w-auto"
//                         />
//                     )}
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <nav className="hidden md:flex items-center space-x-6">
//                     {navigationLinks.map((link, index) => (
//                         <Link
//                             key={index}
//                             href={link.href}
//                             className={`text-white transition-colors hover:text-[#FFD6B0] dark:hover:text-primary font-inter ${
//                                 currentPath === link.href
//                                     ? "font-semibold dark:text-primary"
//                                     : "font-medium"
//                             }`}
//                         >
//                             {link.name}
//                         </Link>
//                     ))}
//                     {/* Theme Toggle */}
//                     <ThemeToggle />
//                 </nav>

//                 {/* Burger Icon */}
//                 <div className="flex flex-row gap-2 items-center md:hidden">
//                     <ThemeToggle />
//                     <button
//                         className="text-white focus:outline-none"
//                         onClick={toggleMenu}
//                     >
//                         {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Navigation */}
//             {menuOpen && (
//                 <div
//                     className={`absolute top-[102px] left-0 w-full bg-primary dark:bg-[#282828] pb-4 shadow-md z-10 rounded-b-lg transition-transform duration-300 ease-in-out ${
//                         menuOpen
//                             ? "translate-y-0 opacity-100"
//                             : "-translate-y-full opacity-0"
//                     }`}
//                 >
//                     <nav className="flex flex-col items-start space-y-4 p-4">
//                         {navigationLinks.map((link, index) => (
//                             <div className="flex flex-row justify-between w-full">
//                                 <Link
//                                     key={index}
//                                     href={link.href}
//                                     className={`text-white transition-colors hover:text-[#FFD6B0] dark:hover:text-primary font-inter ${
//                                         currentPath === link.href
//                                             ? "font-semibold dark:text-primary"
//                                             : "font-medium"
//                                     }`}
//                                     onClick={toggleMenu} // Close menu on link click
//                                 >
//                                     {link.name}
//                                 </Link>
//                                 <ChevronRight color="white" />
//                             </div>
//                         ))}
//                     </nav>
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;
