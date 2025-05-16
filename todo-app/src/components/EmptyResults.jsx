import React from "react";
import emptyImage from "../assets/empty2.jpg";

const EmptyResults = ({ searchTerm, filter, darkMode }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <img
        src={emptyImage}
        alt="No Results"
        className="w-full max-h-[500px] object-contain mb-6"
      />
    </div>
  );
};

export default EmptyResults;
