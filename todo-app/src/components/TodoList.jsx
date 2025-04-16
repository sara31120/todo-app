import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import { Sun, Moon } from "lucide-react";

const TodoList = ({ darkMode, setDarkMode }) => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5001/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleAddTodo = async (title) => {
    try {
      await fetch("http://localhost:5001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    await fetch(`http://localhost:5001/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5001/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  const editTodo = async (id, title) => {
    await fetch(`http://localhost:5001/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    fetchTodos();
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "Completed") return todo.completed;
      if (filter === "Active") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchEnter = () => {
    if (searchTerm.trim() && filteredTodos.length === 0) {
      navigate("/empty", {
        state: { searchTerm, filter, darkMode },
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="max-w-xl mx-auto mt-0 px-4 min-h-screen bg-background text-textDark dark:bg-gray-900 dark:text-white transition-colors relative">
      <h1 className="text-3xl font-bold text-center mb-6">TODO LIST</h1>

      <div className="flex justify-center items-center gap-4 mb-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearchEnter={handleSearchEnter}
        />
        <FilterDropdown filter={filter} setFilter={setFilter} />
        <button
          onClick={toggleDarkMode}
          className="h-10 w-10 flex items-center justify-center bg-brand dark:bg-gray-700 rounded text-white hover:brightness-110 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <ul className="space-y-3">
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>

      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-6 right-6 bg-brand text-white text-4xl w-14 h-14 rounded-full shadow-lg hover:brightness-110 z-50 transition"
      >
        +
      </button>

      {showAddModal && (
        <AddTodo onAdd={handleAddTodo} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default TodoList;
