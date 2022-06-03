import React from "react";
import CartProduct from "./CartProduct";

function CartProducts({ cartProducts }) {
  return (
    <div>
      {cartProducts.map((cartProduct, index) => (
        <CartProduct key={index} {...cartProduct} />
      ))}
    </div>
  );
}

export default CartProducts;
