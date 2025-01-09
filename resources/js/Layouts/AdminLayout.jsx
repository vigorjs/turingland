import Sidebar from '@/Components/admin/Sidebar'; // Import Sidebar component
import SearchBar from '@/Components/admin/AdminSearchBar'; // Import SearchBar component
import ProfileAdmin from '@/Components/admin/AdminProfile';

export default function AdminLayout({ children }) {

    const img = "https://s3-alpha-sig.figma.com/img/784b/7736/5e99b1bf5aad4a3091a28aa4c839c40b?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Hko1ekvbuD9XvFWey-9mdLUIwpSC-0n5u-N9ia5WcMDM5BJMg7tOUey6W3MRQPzK-LX0jtNHWgZcApClf~D4va5VT-y8ZN7p0VqbUEaPkHK7odjRjEen28anwXXr4oG6V7k8TygCjCa6XXvLMpKM5i5T7oc~WNj9qgRpbYkuEFmVB3~DQqUxDyGDL8JEjMT52uwl5DMrTdkDJ45IdCYmS6cALF3Ky1zH2waAdwjYXgYiLCY2UXw1NpSt51F7Byam3bI36VtzZ3lpF~LZ4LRTF-4dox2S17zaKl0T8fYyId5ljkhK3qIVschMSRB5LT8VHuVy3tSsHflGZCcLQFJtcw__"
    const name = "Admin1";
    const email = "Adminone@turingland.com";

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <div className="flex pl-4 pt-4 pb-4">
                <Sidebar />
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col pt-6 pl-3">
                {/* Header (SearchBar + Profile Admin) */}
                <div className="flex items-center justify-between mb-4 max-w-[750px] w-full">
                    {/* SearchBar */}
                    <div className="flex-1">
                        <SearchBar />
                    </div>

                    {/* Profile Admin */}
                    <div className="absolute top-0 right-0 mt-6 mr-4">
                        <ProfileAdmin imgSrc={img} name={name} email={email} />
                    </div>
                </div>

                {/* Main Content (children) */}
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}