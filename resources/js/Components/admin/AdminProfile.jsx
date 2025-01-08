const AdminProfile = ({ imgSrc, name, email }) => {
    return (
        <div className="flex items-center space-x-2 border border-gray-300 bg-white rounded-lg">
            {/* Profile Image */}
            <div className="pt-0.5 pb-0.5 pl-3">
                <img
                    src={imgSrc}
                    alt="Profile"
                    className="w-[36px] h-[36px] rounded-full border border-gray-300"
                />
            </div>

            {/* Profile Info */}
            <div className="pr-4">
                <p className="text-[15px] font-bold">{name}</p>
                <p className="text-[10px] text-black">{email}</p>
            </div>
        </div>
    );
};

export default AdminProfile;
