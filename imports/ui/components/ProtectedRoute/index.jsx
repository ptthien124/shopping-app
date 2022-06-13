import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import React from "react";

function ProtectedRoute({
  redirectPath = "/login",
  admin,
  path,
  layout,
  component,
}) {
  const Layout = layout === null ? DefaultLayout : layout;
  const Component = component;

  const user = useSelector((state) => state.auth).userData;

  let isAuthenticated = !!user._id;

  if (user.profile) {
    if (admin && !user.profile.isAdmin) {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return <Redirect to={redirectPath} exact />;
  }
  return (
    <Route path={path}>
      <Layout>
        <Component />
      </Layout>
    </Route>
  );
}

export default ProtectedRoute;
