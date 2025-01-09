import { FaSearch } from 'react-icons/fa'; // Ikon pencarian
import { useState } from 'react'; // Untuk mengelola state pencarian

const AdminSearchBar = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Menyimpan query pencarian

    // Fungsi untuk menangani pencarian
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            console.log('Melakukan pencarian untuk:', searchQuery);
            // Lakukan aksi pencarian, bisa menggunakan API atau manipulasi data
        }
    };

    return (
        <div className="relative flex items-center">
            {/* Input Pencarian */}
            <input
                type="text"
                placeholder="Rumah Fauzan Property"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
                className="flex-1 px-4 py-2 border border-[#C6C6C6] bg-[#EDEDED] rounded-lg pr-10 text-black" // Padding kanan untuk memberi ruang bagi ikon
            />
            {/* Ikon Pencarian */}
            <FaSearch 
                className="absolute right-3 text-gray-500 text-lg cursor-pointer"
                onClick={handleSearch} // Ketika ikon diklik, lakukan pencarian
            />
        </div>
    );
};

export default AdminSearchBar;
