import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm, onSearchEnter, className }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearchEnter) {
      onSearchEnter();
    }
  };

  return (
    <div className={`relative w-full sm:w-96 ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search note..."
        className="w-full pl-4 pr-10 py-2.5 rounded-md bg-background dark:bg-gray-800 text-textDark dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-brand dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-brand text-lg pointer-events-none" />
    </div>
  );
};

export default SearchBar;
