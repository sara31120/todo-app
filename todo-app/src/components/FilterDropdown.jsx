import React from "react";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <div className="w-full sm:w-20">
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full pl-2 pr-6 py-2.5 rounded-md bg-brand dark:bg-gray-800 text-white placeholder-gray-500 border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand text-sm"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Active">Active</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
