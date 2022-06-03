import { Meteor } from "meteor/meteor";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import CartPage from "./components/CartPage/CartPage";
import LoginPage from "./components/login&signUp/LoginPage";
import SignUpPage from "./components/login&signUp/SignUpPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Header from "./components/Header";
import AdminPage from "./components/AdminPage/AdminPage";

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
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedPage user={user}>
              <ProductPage />
            </ProtectedPage>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedPage user={user}>
              <CartPage />
            </ProtectedPage>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedPage user={user}>
              <AdminPage />
            </ProtectedPage>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
