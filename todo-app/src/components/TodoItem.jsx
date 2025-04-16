import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo, index }) => {
  const showBorder = index === 0 || index === 1;

  return (
    <li
      className={`flex justify-between items-center px-4 py-3 transition-colors bg-transparent dark:bg-gray-800 ${
        showBorder ? "border-b border-brand dark:border-gray-600" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id, todo.completed)}
          className="accent-brand w-5 h-5 cursor-[url('/cursor.jpg'),_pointer]"
        />

        <span
          className={`text-base font-medium transition-colors ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-textDark dark:text-white"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            const newTitle = prompt("Edit task", todo.title);
            if (newTitle?.trim()) editTodo(todo.id, newTitle.trim());
          }}
          className="text-gray-400 dark:text-gray-400 hover:text-brand dark:hover:text-brand"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 dark:text-gray-400 hover:text-brand dark:hover:text-brand"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
