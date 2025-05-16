import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import EmptyResults from "./EmptyResults";
import { Sun, Moon } from "lucide-react";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../utils/todoApi";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAdd = async (title) => {
    try {
      await addTodo(title);
      const updated = await fetchTodos();
      setTodos(updated);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await toggleTodo(id, completed);
      await loadTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      await editTodo(id, newTitle);
      await loadTodos();
      setEditingTodo(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const title = todo?.title?.toLowerCase?.() || "";
    const matchesSearch = title.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !todo.completed) ||
      (filter === "Completed" && todo.completed);
    return matchesSearch && matchesFilter;
  });

  // Instead of navigating away on no results, just update searchTerm state
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="max-w-xl mx-auto mt-0 px-4 bg-background dark:bg-gray-900 text-textDark dark:text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">TODO LIST</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-6">
        <div className="flex-grow">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearch} />
        </div>
        <div className="flex items-center gap-3 mt-7 sm:mt-0">
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="h-10 w-10 flex items-center justify-center bg-brand dark:bg-gray-700 rounded text-white hover:brightness-110 transition"
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
