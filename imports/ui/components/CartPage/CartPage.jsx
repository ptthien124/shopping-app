import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../../styles/css/cartPage.css";
import { Empty, CartProducts } from "../CartPage";

function CartPage() {
  const [products, setProducts] = useState([]);
  const cartList = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth).userData;

  useEffect(() => {
    if (user._id) {
      const list = cartList.list.filter((item) => item.userId === user._id);
      setProducts(list);
    }
  }, [cartList]);

  const roundNumber = (value, decimals) =>
    Number(Math.round(value + "e" + decimals) + "e-" + decimals);

  const total = useMemo(() => {
    return roundNumber(
      products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
      2
    );
  }, [products]);

  return (
    <div className="cartPage">
      {products.length <= 0 ? (
        <Empty />
      ) : (
        <div
          className="grid wide cart"
          style={{ paddingTop: "80px", maxWidth: "1000px" }}
        >
          <h2>Your Cart</h2>
          <CartProducts cartProducts={products} />
          <div className="separator"></div>
          <strong className="total">
            Total: <span>{products.length > 0 && total}$</span>
          </strong>
        </div>
      )}
    </div>
  );
}

export default CartPage;
