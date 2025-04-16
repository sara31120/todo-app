import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import AddTodo from "./AddTodo";
import { Sun, Moon } from "lucide-react";
import emptyImage from "../assets/empty2.jpg";

const EmptyResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { searchTerm, filter, darkMode } = location.state;

      setSearchTerm(searchTerm || "");
      setFilter(filter || "All");
      setDarkMode(darkMode || false);

      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [location.state]);

  const handleAddTodo = async (title) => {
    try {
      await fetch("http://localhost:5001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      setShowAddModal(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="max-w-xl mx-auto mt-0 px-4 bg-background dark:bg-gray-900 text-textDark dark:text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-6">TODO LIST</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-6">
        <div className="flex-grow">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex items-center gap-3 mt-7 sm:mt-0">
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <button
            onClick={toggleDarkMode}
            className="h-10 w-10 flex items-center justify-center bg-brand dark:bg-gray-700 rounded text-white hover:brightness-110 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-grow" />

      <div className="flex flex-col items-center justify-end text-center">
        <img
          src={emptyImage}
          alt="No results"
          className="w-full max-h-[500px] object-contain mb-6"
        />
      </div>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 bg-brand text-white text-4xl w-14 h-14 rounded-full shadow-lg hover:brightness-110 z-50"
      >
        +
      </button>

      {showAddModal && (
        <AddTodo onAdd={handleAddTodo} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default EmptyResults;
