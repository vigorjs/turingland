import { navigationLinks } from "@/const/NavigationLink";
import {
    FaInstagram,
    FaTiktok,
    FaYoutube,
    FaTwitter,
    FaFacebook,
} from "react-icons/fa";
import ApplicationLogo from "./ApplicationLogo";
import { Link } from "@inertiajs/react";

const Footer = ({ areas, categories }) => {
    return (
        <>
            {/* Footer */}
            <footer className="bg-[#222222] text-white py-12">
                <div className="container mx-auto flex flex-col md:flex-row flex-wrap gap-4 md:justify-between md:items-start px-6 lg:px-32">
                    {/* Left Side: Logo and Address */}
                    <div className="flex flex-col items-start mb-8 md:mb-0 md:w-1/3">
                        <div className="flex items-center mb-4">
                            {/* Logo */}
                            <ApplicationLogo />
                        </div>
                        <div className="text-left">
                            <p className="text-[#A5A5A5] font-poppins text-sm leading-6">
                                Turingland Yawn
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-sm leading-6">
                                Jl. Alan Turing No. 17, Turing City
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-sm leading-6 mb-4">
                                Jakarta Selatan, DKI Jakarta
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-sm leading-6">
                                +628123456789
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-sm leading-6">
                                turinglandyawn@property.com
                            </p>
                        </div>
                    </div>

                    {/* Center: Explore */}
                    <div className="flex flex-col md:flex-row md:gap-20 mr-20">
                        <div className="flex flex-col mb-8 md:mb-0 md:w-1/3">
                            <p className="text-white font-inter text-lg font-bold leading-6 mb-4">
                                Explore
                            </p>
                            <div className="flex flex-col space-y-2">
                                {navigationLinks.map((link, index) => (
                                    <Link
                                        key={`footer-link-${index}`}
                                        href={link.href}
                                        className="text-[#A5A5A5] font-inter text-sm leading-6 hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col mb-8 md:mb-0 md:w-2/3">
                            <p className="text-white font-inter text-lg font-bold leading-6 mb-4">
                                Area
                            </p>
                            <div className="flex flex-col space-y-2">
                                {areas.slice(0, 5).map((area, index) => (
                                    <Link
                                        key={`footer-area-${index}`}
                                        // href={area.href}
                                        className="text-[#A5A5A5] font-inter text-sm leading-6 hover:underline"
                                    >
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col mb-8 md:mb-0 md:w-2/3">
                            <p className="text-white font-inter text-lg font-bold leading-6 mb-4">
                                Kategori
                            </p>
                            <div className="flex flex-col space-y-2">
                                {categories
                                    .slice(0, 5)
                                    .map((category, index) => (
                                        <Link
                                            key={`footer-category-${index}`}
                                            // href={category.href}
                                            className="text-[#A5A5A5] font-inter text-sm leading-6 hover:underline"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                            </div>
                        </div>

                        {/* Right Side: Follow Us */}
                        <div className="flex flex-col md:w-1/3">
                            <p className="text-white font-inter text-lg font-bold leading-6 mb-4">
                                Follow Us
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaInstagram
                                        className="text-[#A5A5A5] hover:text-white"
                                        size={23}
                                    />
                                </Link>
                                <Link
                                    href="https://www.tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTiktok
                                        className="text-[#A5A5A5] hover:text-white"
                                        size={23}
                                    />
                                </Link>
                                <Link
                                    href="https://www.youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaYoutube
                                        className="text-[#A5A5A5] hover:text-white"
                                        size={23}
                                    />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter
                                        className="text-[#A5A5A5] hover:text-white"
                                        size={23}
                                    />
                                </Link>
                                <Link
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebook
                                        className="text-[#A5A5A5] hover:text-white"
                                        size={23}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Footer - Copyright */}
            <footer className="bg-black text-white py-4">
                <div className="container mx-auto text-center text-sm px-6">
                    <p>
                        &copy; {new Date().getFullYear()} Turingland Yawn All
                        Rights Reserved
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
