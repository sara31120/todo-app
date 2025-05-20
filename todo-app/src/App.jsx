import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "./components/TodoList";
import EmptyResults from "./components/EmptyResults";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "./utils/todoApi";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (theme === "dark" || (!theme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      const html = document.documentElement;
      if (newMode) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (title) => {
    try {
      await addTodo(title);
      await loadTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      await toggleTodo(id, completed);
      await loadTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-background text-black dark:bg-gray-900 dark:text-white transition-colors m-0">
      <Routes>
        <Route
          path="/"
          element={
            <ToDoList
              todos={todos}
              filter={filter}
              setFilter={setFilter}
              searchTerm={searchTerm}
              setSearchTerm={handleSearch}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              editingTodo={editingTodo}
              setEditingTodo={setEditingTodo}
              handleAdd={handleAdd}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          }
        />
        <Route path="/empty" element={<EmptyResults />} />
      </Routes>
    </div>
  );
};

export default App;
