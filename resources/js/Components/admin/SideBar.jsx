import { Link, usePage } from '@inertiajs/react';
import { FaHome, FaFileAlt, FaCog } from 'react-icons/fa'; // Import ikon dari React Icons

const Sidebar = () => {
    const { url } = usePage(); // Mendapatkan URL saat ini untuk menentukan menu yang aktif

    const navigationLinks = [
        { name: 'Nama Menu One', href: '/admin-page-one', icon: <FaHome /> },
        { name: 'Nama Menu Two', href: '/admin-page-two', icon: <FaFileAlt /> },
        { name: 'Website Setting', href: '/admin-setting', icon: <FaCog /> },
    ];

    return (
        <div
            className="bg-[#222222] text-white rounded-2xl px-6 py-8 flex flex-col shadow-lg"
            style={{
                width: '270px',
                margin: '8px', // Memberikan jarak di sekeliling sidebar
            }}
        >
            {/* Logo */}
            <div className="mb-10">
                <img src="/assets/turinglandlogo.png" alt="Turingland Yawn" className="h-12" />
            </div>

            {/* Menu Title */}
            <h2 className="text-[#979797] text-[14px] uppercase mb-4">Menu</h2>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-2">
                {navigationLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            url === link.href
                                ? 'bg-white text-[#222222]'
                                : 'text-white hover:bg-gray-700'
                        }`}
                    >
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-bold text-[15px]">{link.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
