import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "./components/TodoList";
import EmptyResults from "./components/EmptyResults";

const App = () => {
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
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen bg-background text-black dark:bg-gray-900 dark:text-white transition-colors m-0">
      <Routes>
        <Route
          path="/"
          element={<ToDoList toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/empty"
          element={<EmptyResults toggleDarkMode={toggleDarkMode} />}
        />
      </Routes>
    </div>
  );
};

export default App;
