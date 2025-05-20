import React from "react";
import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit, index }) => {
  const showBorder = index === 0 || index === 1;

  return (
    <li
      className={`flex justify-between items-center px-4 py-3 transition-colors bg-transparent ${
        showBorder ? "border-b border-brand" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="accent-brand w-5 h-5 cursor-[url('/cursor.jpg'),_pointer]"
        />
        <span
          className={`text-base font-medium transition-colors ${
            todo.completed
              ? "line-through text-[rgb(var(--color-muted))]"
              : "text-[rgb(var(--color-text))]"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(todo)}
          aria-label="Edit task"
          className="text-[rgb(var(--color-muted))] hover:text-brand"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          className="text-[rgb(var(--color-muted))] hover:text-brand"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default TodoItem;
