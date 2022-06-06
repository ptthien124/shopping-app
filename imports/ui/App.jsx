import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { DefaultLayout } from "./layouts";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute
                  publicRoute
                  component={route.component}
                  layout={route.layout}
                />
              }
            />
          ))}

          {privateRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute
                  publicRoute
                  component={route.component}
                  layout={route.layout}
                />
              }
            />
          ))}

          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute
                  admin
                  component={route.component}
                  layout={route.layout}
                />
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
