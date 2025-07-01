import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Signup from "./signup.jsx";
import Login from "./login.jsx";
import Homepage from "./homepage.jsx";
import UserTodos from "./usertodos.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute";
import Todo from "./todo.jsx";
import Users from "./users.jsx";
import "./index.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AdminOnlyRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const realAdminEmail = "santhoshadmin@gmail.com";

  if (!token) return <Navigate to="/login" />;
  if (user.role !== "admin" || user.email !== realAdminEmail) {
    alert("Access denied: You are not the authorized admin.");
    return <Navigate to="/home" />;
  }

  return children;
}

const router = createBrowserRouter([
  { path: "/", element: <Signup /> },
  { path: "/login", element: <Login /> },

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Homepage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: (
          <AdminOnlyRoute>
            <Users />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "todo",
        element: (
          <RoleProtectedRoute allowedRoles={["admin", "customer"]}>
            <Todo />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "user/:id",
        element: (
          <RoleProtectedRoute allowedRoles={["admin", "customer"]}>
            <UserTodos />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
