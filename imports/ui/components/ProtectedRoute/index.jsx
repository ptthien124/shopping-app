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
    const user = useSelector((state) => state.auth);
    let isAuthenticated = user.isLoggedIn;

    if (admin && !user.isAdmin) {
      isAuthenticated = false;
    }

    if (!isAuthenticated) {
      return (
        <Route path={path} element={<Navigate to={redirectPath} replace />} />
      );
    }
  }
  return (
    <Route
      path={path}
      element={
        <Layout>
          <Component />
        </Layout>
      }
    />
  );
}

export default ProtectedRoute;
