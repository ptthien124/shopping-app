import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function index({ redirectPath = "/login", children, admin }) {
  const user = useSelector((state) => state.auth);
  let isAuthenticated = user.isLoggedIn;

  const isAdmin = user.isAdmin;

  if (admin && !isAdmin) {
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default index;
