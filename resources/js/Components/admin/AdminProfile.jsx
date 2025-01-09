const AdminProfile = ({ imgSrc, name, email, isCollapsed }) => {
    return (
        <div className="flex items-center space-x-2 border border-gray-300 bg-white rounded-lg px-2 py-1">
            {/* Profile Image */}
            <img
                src={imgSrc}
                alt="Profile"
                className="w-[36px] h-[36px] rounded-full border border-gray-300"
            />

            {/* Profile Info (Sembunyikan di layar kecil) */}
            {!isCollapsed && (
                <div className="pr-4">
                    <p className="text-[15px] text-black font-bold">{name}</p>
                    <p className="text-[10px] text-black">{email}</p>
                </div>
            )}
        </div>
    );
};

export default AdminProfile;
