import React, { useState } from "react";

const EditTodo = ({ todo, onUpdate, onClose }) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (newTitle.trim()) {
      onUpdate(todo.id, newTitle.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-background dark:bg-gray-900 text-textDark dark:text-white p-6 rounded-xl w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Note</h2>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-textDark dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Update your task..."
        />
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-textDark dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 text-sm bg-brand text-white rounded hover:brightness-110 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
