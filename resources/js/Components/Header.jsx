import { useEffect, useState } from "react";
import { ThemeToggle } from "@/Components/ThemeToggle";
import { navigationLinks } from "@/const/NavigationLink";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    const toggleMenu = () => setMenuOpen(!menuOpen);

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

    return (
        <header
            className={`fixed top-0 w-full z-20 h-[102px] flex items-center transition-all duration-300 ${
                isScrolled
                    ? "bg-primary shadow-md dark:bg-[#282828]"
                    : "bg-transparent dark:bg-[#282828]"
            }`}
        >
            <div className="flex items-center justify-between px-3 md:px-4 lg:px-[200px] w-full h-full">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center hover:opacity-90 transition-opacity"
                >
                    {theme === "dark" ? (
                        <img
                            src="/assets/turinglandlogodark.png"
                            alt="Application Logo"
                            className="h-auto w-auto"
                        />
                    ) : (
                        <img
                            src="/assets/turinglandlogo.png"
                            alt="Application Logo"
                            className="h-auto w-auto"
                        />
                    )}
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`text-white transition-colors hover:text-[#FFD6B0] dark:hover:text-primary font-inter ${
                                currentPath === link.href
                                    ? "font-semibold dark:text-primary"
                                    : "font-medium"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {/* Theme Toggle */}
                    <ThemeToggle />
                </nav>

                {/* Burger Icon */}
                <div className="flex flex-row gap-2 items-center md:hidden">
                    <ThemeToggle />
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div
                    className={`absolute top-[102px] left-0 w-full bg-primary dark:bg-[#282828] pb-4 shadow-md z-10 rounded-b-lg transition-transform duration-300 ease-in-out ${
                        menuOpen
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-full opacity-0"
                    }`}
                >
                    <nav className="flex flex-col items-start space-y-4 p-4">
                        {navigationLinks.map((link, index) => (
                            <div className="flex flex-row justify-between w-full">
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={`text-white transition-colors hover:text-[#FFD6B0] dark:hover:text-primary font-inter ${
                                        currentPath === link.href
                                            ? "font-semibold dark:text-primary"
                                            : "font-medium"
                                    }`}
                                    onClick={toggleMenu} // Close menu on link click
                                >
                                    {link.name}
                                </Link>
                                <ChevronRight color="white" />
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
