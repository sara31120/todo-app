import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateTodo } from "../utils/todoApi";

const EditTodo = ({ todo, onSave, onCancel }) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = async () => {
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle) {
      try {
        await updateTodo(todo.id, trimmedTitle);
        onSave(todo.id, trimmedTitle);
        onCancel();
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[rgb(var(--color-card))] text-[rgb(var(--color-text))] p-6 rounded-xl w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Note</h2>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md bg-transparent text-[rgb(var(--color-text))] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="Update your task..."
        />
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-400 text-[rgb(var(--color-text))] rounded hover:bg-gray-300 transition"
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

EditTodo.propTypes = {
  todo: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTodo;
