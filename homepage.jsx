import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Homepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isHomePageRoot = location.pathname === "/home";

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h2 style={{ color: "white", marginBottom: "20px" }}>
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </h2>

        {role === "admin" ? (
          <>
            <button
              onClick={() => navigate("/home/users")}
              className="nav-button"
            >
              All Users
            </button>
            <button
              onClick={() => navigate("/home/todo")}
              className="nav-button"
            >
              Manage Todos
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate(`/home/user/${user?.id}`)}
              className="nav-button"
            >
              My Profile
            </button>
            <button
              onClick={() => navigate("/home/todo")}
              className="nav-button"
            >
              My Todos
            </button>
          </>
        )}

        <button
          onClick={handleLogout}
          className="nav-button"
          style={{ marginTop: "auto" }}
        >
          Logout
        </button>
      </div>

      <div className="main-content">
        {isHomePageRoot ? (
          <h1
            style={{ color: "#f5f5f5", fontSize: "32px", textAlign: "center" }}
          >
            Welcome to Todo App
          </h1>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Homepage;
