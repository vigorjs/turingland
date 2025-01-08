import { ThemeToggle } from "@/Components/ThemeToggle";
import { navigationLinks } from "@/const/NavigationLink";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "@inertiajs/react";

const Header = () => {

    const { theme } = useTheme();

    return (
        <>
            {/* Header */}
            <header className="w-full bg-[#FD9458] py-4 shadow-md mb-6 h-[102px] flex items-center dark:bg-[#282828]">
                <div className="flex items-center justify-between px-3 md:px-6 lg:px-[150px] w-full mx-5">
                    {" "}
                    {/* Padding horizontal lebih besar */}
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        {theme === "dark" ? (
                            <img
                                src="/assets/turinglandlogodark.png"
                                alt="Application Logo"
                                className="h-full w-auto"
                            />
                        ) : (
                            <img
                                src="/assets/turinglandlogo.png"
                                alt="Application Logo"
                                className="h-full w-auto"
                            />
                        )}
                    </Link>
                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        {navigationLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-white hover:font-bold font-medium dark:hover:text-[#FD9458]"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Icon Night Mode */}
                        <ThemeToggle />
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
