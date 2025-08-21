import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token || role !== "USER") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
