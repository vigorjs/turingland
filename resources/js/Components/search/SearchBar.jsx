import React from "react";

const SearchBar = () => {
    return (
      <div className="flex flex-col gap-4 mt-6 px-8">
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Rumah Vigro Free Sex"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <button className="bg-[#FD9458] text-white px-6 py-2 rounded-lg">
            Search
          </button>
        </div>
        <div className="flex gap-4">
        </div>
      </div>
    )
}

export default SearchBar;