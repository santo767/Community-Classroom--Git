import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserTodos() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !id) return;
    fetchUser();
    fetchTodos();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("User fetch error:", err);
      alert("Failed to load user info");
    }
  };

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/usertodos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch (err) {
      console.error("Todos fetch error:", err);
      alert("Failed to load user's todos");
    }
  };

  return (
    <div className="todo-page">
      <h2>{user?.name ? `${user.name}'s Todo History` : "Loading user..."}</h2>
      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.text}</span>
            </li>
          ))
        ) : (
          <p style={{ color: "#bbb", textAlign: "center" }}>No todos found</p>
        )}
      </ul>
    </div>
  );
}

export default UserTodos;
