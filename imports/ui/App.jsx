import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";
import "./styles/css/antd.css";
import "./styles/css/GlobalStyles.css";

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
