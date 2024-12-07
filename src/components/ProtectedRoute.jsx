import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../utils/useAuth";

const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }) => {
  const user = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Check if the user's role is in the allowed roles
  const isAllowed = allowedRoles.includes(user.role);

  // If not allowed, redirect to an appropriate page
  if (!isAllowed) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  // If allowed, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
