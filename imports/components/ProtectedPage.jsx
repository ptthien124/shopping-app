import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedPage({ user, redirectPath = "/login", children }) {
  if (!user.isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedPage;
