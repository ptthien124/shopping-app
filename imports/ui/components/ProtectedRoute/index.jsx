import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DefaultLayout } from "../../layouts";

function ProtectedRoute({
  redirectPath = "/login",
  admin,
  publicRoute,
  layout,
  component,
}) {
  const Layout = layout === null ? DefaultLayout : layout;
  const Component = component;

  if (!publicRoute) {
    const user = useSelector((state) => state.auth).userData;
    let isAuthenticated = !!user._id;

    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }

    if (admin && !user.profile.isAdmin) {
      isAuthenticated = false;
    }

    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
  }
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default ProtectedRoute;
