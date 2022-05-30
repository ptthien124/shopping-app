import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProductsCollection } from "../api/links";
import CartPage from "./CartPage/CartPage";
import LoginPage from "./login&signUp/LoginPage";
import SignUpPage from "./login&signUp/SignUpPage";
import ProductPage from "./ProductPage/ProductPage";
import { useTracker } from "meteor/react-meteor-data";
import ProtectedPage from "../components/ProtectedPage";
import AdminPage from "./AdminPage/AdminPage";

function App() {
  const user = useSelector((state) => state.auth);

  return (
    <div>
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
