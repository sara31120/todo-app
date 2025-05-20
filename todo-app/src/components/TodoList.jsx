import React from "react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import EmptyResults from "./EmptyResults";
import { Sun, Moon } from "lucide-react";

const ToDoList = ({
  todos = [],
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  darkMode,
  toggleDarkMode,
  showAddModal,
  setShowAddModal,
  editingTodo,
  setEditingTodo,
  handleAdd,
  handleToggle,
  handleDelete,
  handleEdit,
}) => {
  const filteredTodos = todos.filter((todo) => {
    const title = todo?.title?.toLowerCase?.() || "";
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !todo.completed) ||
      (filter === "Completed" && todo.completed);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-xl mx-auto mt-0 px-4 bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">TODO LIST</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-6">
        <div className="flex-grow">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex items-center gap-3 mt-7 sm:mt-0">
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <button
            onClick={toggleDarkMode}
            className="h-10 w-10 flex items-center justify-center bg-brand rounded text-white hover:brightness-110 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-grow">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo, index) =>
            editingTodo?.id === todo.id ? (
              <EditTodo
                key={todo.id}
                todo={todo}
                onSave={handleEdit}
                onCancel={() => setEditingTodo(null)}
              />
            ) : (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={() => setEditingTodo(todo)}
              />
            )
          )
        ) : (
          <EmptyResults
            searchTerm={searchTerm}
            filter={filter}
            darkMode={darkMode}
          />
        )}
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-6 bg-brand text-white text-3xl w-12 h-12 rounded-full shadow-lg hover:brightness-110 z-50 flex items-center justify-center"
      >
        +
      </button>

      {showAddModal && (
        <AddTodo onAdd={handleAdd} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default ToDoList;
