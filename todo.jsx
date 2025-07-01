import React, { useEffect, useState } from "react";
import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    fetchTodos();
  }, [token]);

  const fetchTodos = () => {
    axios
      .get("http://localhost:5000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => {
        console.error("Todos fetch error:", err);
        alert("Failed to fetch todos.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    axios
      .post(
        "http://localhost:5000/todos",
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setText("");
        fetchTodos();
      })
      .catch((err) => {
        console.error("Add todo error:", err);
        alert("Failed to add todo.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchTodos())
      .catch((err) => {
        console.error("Delete todo error:", err);
        alert("Failed to delete todo.");
      });
  };

  return (
    <div className="todo-page">
      <h2>Your Todo List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
