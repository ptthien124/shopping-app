import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { DefaultLayout } from "./layouts";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => (
            <ProtectedRoute
              key={index}
              publicRoute
              path={route.path}
              component={route.component}
              layout={route.layout}
            />
          ))}

          {privateRoutes.map((route, index) => (
            <ProtectedRoute
              key={index}
              path={route.path}
              component={route.component}
              layout={route.layout}
            />
          ))}

          {adminRoutes.map((route, index) => (
            <ProtectedRoute
              key={index}
              admin
              path={route.path}
              component={route.component}
              layout={route.layout}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
