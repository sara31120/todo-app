import React, { useState } from "react";
import PropTypes from "prop-types";

const AddTodo = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle); 
      setTitle("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background dark:bg-gray-900 text-textDark dark:text-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center">NEW NOTE</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Input your note..."
          className="w-full px-4 py-3 border border-brand dark:border-blue-400 rounded-md bg-white dark:bg-gray-800 text-textDark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold bg-background dark:bg-gray-700 text-brand dark:text-brand rounded border border-brand hover:brightness-110 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium bg-brand text-white rounded hover:bg-opacity-90 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddTodo;
