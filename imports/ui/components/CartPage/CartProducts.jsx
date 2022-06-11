import React from "react";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";

function CartProducts({ cartProducts }) {
  const auth = useSelector((state) => state.auth).userData;
  return (
    <div>
      {cartProducts.map((cartProduct, index) => (
        <CartProduct
          key={index}
          {...cartProduct}
          userId={auth._id || undefined}
        />
      ))}
    </div>
  );
}

export default CartProducts;
