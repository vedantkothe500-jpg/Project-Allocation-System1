import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
