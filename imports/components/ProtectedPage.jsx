import React from "react";
import { Navigate } from "react-router-dom";


function ProtectedPage({ user, redirectPath = "/login", children }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedPage;
