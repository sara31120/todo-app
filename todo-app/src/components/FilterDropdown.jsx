import React from "react";
import PropTypes from "prop-types";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <div className="w-full sm:w-auto">
      <select
        id="filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="h-10 w-full sm:w-32 px-3 rounded-md bg-brand dark:bg-gray-800 text-white text-sm border border-gray-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Active">Active</option>
      </select>
    </div>
  );
};

FilterDropdown.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default FilterDropdown;
