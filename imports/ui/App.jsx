import { Meteor } from "meteor/meteor";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedPage from "../components/ProtectedPage";
import AdminPage from "./AdminPage/AdminPage";
import CartPage from "./CartPage/CartPage";
import Header from "./Header";
import LoginPage from "./login&signUp/LoginPage";
import SignUpPage from "./login&signUp/SignUpPage";
import ProductPage from "./ProductPage/ProductPage";

function App() {
  // login server admin
  useEffect(() => {
    if (!Meteor.user()) {
      const SEED_USERNAME = "admingmail.com";
      const SEED_PASSWORD = "admintest";

      Meteor.loginWithPassword(SEED_USERNAME, SEED_PASSWORD);
    }
  }, []);
  //

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [user]);

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
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
