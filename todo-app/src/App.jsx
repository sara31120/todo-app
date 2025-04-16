import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ToDoList from "./components/TodoList";
import EmptyResults from "./components/EmptyResults";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  return (
    <div className="min-h-screen bg-background text-black dark:bg-gray-900 dark:text-white transition-colors m-0">
      <Routes>
        <Route
          path="/"
          element={<ToDoList darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route
          path="/empty"
          element={
            <EmptyResults darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
