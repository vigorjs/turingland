import { Link } from '@inertiajs/react';
import { FaMoon } from 'react-icons/fa';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function GuestLayout({ children }) {
    // Daftar menu navigasi
    const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'Search', href: '/search' },
        { name: 'About', href: '/' },
        { name: 'Contact', href: '/' },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            {/* Header */}
            <header className="w-full bg-[#FD9458] py-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between px-32"> {/* Padding horizontal lebih besar */}
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/turinglandlogo.png" // Akses file logo dari folder public
                            alt="Application Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        {navigationLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-white hover:underline font-medium"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Icon Night Mode */}
                        <FaMoon className="text-white cursor-pointer" size={20} title="Night Mode" />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center pt-6 sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#222222] text-white py-8">
                <div className="container mx-auto flex justify-between items-start px-32">
                    {/* Left Side: Logo and Address */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center mb-4">
                            <img
                                src="/turinglandlogo.png" // Akses file logo dari folder public
                                alt="Turingland Logo"
                                className="h-10 w-auto mr-4"
                            />
                        </div>

                        <div className="text-left">
                            <p className="text-[#A5A5A5] font-poppins text-[14px] font-normal leading-[21px]">
                                Turingland Yawn
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-[14px] font-normal leading-[21px]">
                                Jl. Alan Turing No. 17, Turing City
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-[14px] font-normal leading-[21px] mb-4">
                                Jakarta Selatan, DKI Jakarta
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-[14px] font-normal leading-[21px]">
                                +628123456789
                            </p>
                            <p className="text-[#A5A5A5] font-poppins text-[14px] font-normal leading-[21px]">
                                turinglandyawn@property.com
                            </p>
                        </div>
                    </div>

                    <div className="container mx-auto flex justify-end items-start px-32">
                        {/* Left Side: Explore */}
                        <div className="flex flex-col items-start px-32">
                            <p className="text-white font-inter text-[24.47px] font-bold leading-[29.61px] mb-4">
                                Explore
                            </p>
                            <div className="flex flex-col space-y-4">
                                {navigationLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="text-[#A5A5A5] font-inter text-[24.47px] font-normal leading-[29.61px] hover:underline"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Follow Us */}
                        <div className="flex flex-col items-start">
                            <p className="text-white font-inter text-[24.47px] font-bold leading-[29.61px] mb-4">
                                Follow Us
                            </p>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="text-[#A5A5A5] hover:text-white" size={23} />
                                </a>
                                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                                    <FaTiktok className="text-[#A5A5A5] hover:text-white" size={23} />
                                </a>
                                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube className="text-[#A5A5A5] hover:text-white" size={23} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="text-[#A5A5A5] hover:text-white" size={23} />
                                </a>
                                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="text-[#A5A5A5] hover:text-white" size={23} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Footer - Copyright */}
            <footer className="bg-black text-white py-4">
                <div className="container mx-auto text-center text-[14px]">
                    <p>&copy; {new Date().getFullYear()} Turingland Yawn All Rights Reserved</p>
                </div>
            </footer>
        </div>
    );
}
