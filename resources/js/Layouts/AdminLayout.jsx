import AdminProfile from "@/Components/admin/AdminProfile";
import Sidebar from "@/Components/admin/SideBar";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children, auth, title = "Dashboard" }) {
    console.log("ini props dari auth di komponen adminLayout : ", auth);

    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="h-full flex">
            <Head title={title} />

            {/* Sidebar - fixed height */}
            <div className="h-full sticky top-0 pl-0 pt-0 pb-0 md:pl-4 md:pt-4 md:pb-4">
                <Sidebar isCollapsed={isSmallScreen} user={auth.user} />
            </div>

            {/* Content Area - scrollable */}
            <div className="flex-1 min-h-screen overflow-y-auto">
                <div className="flex flex-col pt-6 px-3">
                    {/* Header (SearchBar + Profile Admin) */}
                    <div className="flex items-center justify-between mb-4 w-full">
                        <div className="flex-1 max-w-full mt-3">
                            <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
                                {title}
                            </h1>
                        </div>

                        {/* Profile Admin */}
                        <div className="ml-4">
                            <AdminProfile
                                imgSrc={auth.user.photo}
                                name={auth.user.name}
                                email={auth.user.email}
                                isCollapsed={isSmallScreen}
                            />
                        </div>
                    </div>

                    {/* Main Content (children) */}
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
}
