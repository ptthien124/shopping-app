import { Meteor } from "meteor/meteor";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { DefaultLayout } from "./layouts";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";

function App() {
  // login server admin
  useEffect(() => {
    if (!Meteor.user()) {
      const SEED_USERNAME = "admingmail.com";
      const SEED_PASSWORD = "admintest";

      Meteor.loginWithPassword(SEED_USERNAME, SEED_PASSWORD);
    }
  }, []);

  const user = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? DefaultLayout : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {privateRoutes.map((route, index) => {
            const Layout = route.layout === null ? DefaultLayout : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}

          {adminRoutes.map((route, index) => {
            const Layout = route.layout === null ? DefaultLayout : route.layout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute admin>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
