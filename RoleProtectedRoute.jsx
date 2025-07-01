// ============================
// 📁 RoleProtectedRoute.jsx
// ============================
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RoleProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const user = jwtDecode(token);
    if (allowedRoles.includes(user.role)) {
      return children;
    } else {
      return <Navigate to="/home" />;
    }
  } catch (err) {
    console.error("Token decode failed:", err);
    return <Navigate to="/login" />;
  }
}

export default RoleProtectedRoute;
