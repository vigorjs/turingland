import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const AdminSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            console.log('Melakukan pencarian untuk:', searchQuery);
        }
    };

    return (
        <div className="relative flex items-center w-full">
            <input
                type="text"
                placeholder="Cari sesuatu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg pr-10 text-black"
            />
            <FaSearch
                className="absolute right-3 text-gray-500 text-lg cursor-pointer"
                onClick={handleSearch}
            />
        </div>
    );
};

export default AdminSearchBar;
