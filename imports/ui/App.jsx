import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { history } from "./redux/store";
import { adminRoutes, privateRoutes, publicRoutes } from "./routes";
import "./styles/css/antd.css";
import "./styles/css/GlobalStyles.css";
import React from "react";
import LoginPage from "./components/login&signUp/LoginPage";
import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import { DefaultLayout } from "./layouts";
import SignUpPage from "./components/login&signUp/SignUpPage";

function App() {
  return (
    <ConnectedRouter history={history}>
      <div className="app">
        <Switch>
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

          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? DefaultLayout : route.layout;
            const Component = route.component;
            return (
              <Route key={index} path={route.path}>
                <Layout>
                  <Component />
                </Layout>
              </Route>
            );
          })}
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
