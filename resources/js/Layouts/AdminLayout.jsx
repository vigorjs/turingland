import AdminProfile from "@/Components/admin/AdminProfile";
import AdminSearchBar from "@/Components/admin/AdminSearchBar";
import Sidebar from "@/Components/admin/SideBar";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children, auth }) {
    console.log("ini props dari auth di komponen adminLayout : ", auth);
    // console.log(
    //     "ini props dari auth.user di komponen adminLayout : ",
    //     auth.user
    // );

    const img =
        "https://s3-alpha-sig.figma.com/img/784b/7736/5e99b1bf5aad4a3091a28aa4c839c40b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Hko1ekvbuD9XvFWey-9mdLUIwpSC-0n5u-N9ia5WcMDM5BJMg7tOUey6W3MRQPzK-LX0jtNHWgZcApClf~D4va5VT-y8ZN7p0VqbUEaPkHK7odjRjEen28anwXXr4oG6V7k8TygCjCa6XXvLMpKM5i5T7oc~WNj9qgRpbYkuEFmVB3~DQqUxDyGDL8JEjMT52uwl5DMrTdkDJ45IdCYmS6cALF3Ky1zH2waAdwjYXgYiLCY2UXw1NpSt51F7Byam3bI36VtzZ3lpF~LZ4LRTF-4dox2S17zaKl0T8fYyId5ljkhK3qIVschMSRB5LT8VHuVy3tSsHflGZCcLQFJtcw__";
    const name = "Admin1";
    const email = "Adminone@turingland.com";

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
        <div className="min-h-screen flex">
            <Head title="Dashboard" />

            {/* Sidebar - fixed height */}
            <div className="h-screen sticky top-0 pl-0 pt-0 pb-0 md:pl-4 md:pt-4 md:pb-4">
                <Sidebar isCollapsed={isSmallScreen} />
            </div>

            {/* Content Area - scrollable */}
            <div className="flex-1 min-h-screen overflow-y-auto">
                <div className="flex flex-col pt-6 px-3">
                    {/* Header (SearchBar + Profile Admin) */}
                    <div className="flex items-center justify-between mb-4 w-full">
                        {/* SearchBar */}
                        <div className="flex-1 max-w-full">
                            <AdminSearchBar />
                        </div>

                        {/* Profile Admin */}
                        <div className="ml-4">
                            <AdminProfile
                                imgSrc={img}
                                name={name}
                                email={email}
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
