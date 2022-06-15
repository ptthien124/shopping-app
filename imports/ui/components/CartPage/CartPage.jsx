import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../../styles/css/cartPage.css";
import { Empty, CartProducts } from "../CartPage";

function CartPage() {
  const [prod, setProd] = useState([]);
  const cartList = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth).userData;

  useEffect(() => {
    if (user._id) {
      const list = cartList.list.filter((item) => item.userId === user._id);
      setProd(list);
    }
  }, [cartList]);

  const round = (value, decimals) =>
    Number(Math.round(value + "e" + decimals) + "e-" + decimals);

  const total = useMemo(() => {
    return round(
      prod.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
      2
    );
  }, [prod]);

  return (
    <div className="cartPage">
      {prod.length <= 0 ? (
        <Empty />
      ) : (
        <div
          className="grid wide cart"
          style={{ paddingTop: "80px", maxWidth: "1000px" }}
        >
          <h2>Your Cart</h2>
          <CartProducts cartProducts={prod} />
          <div className="separator"></div>
          <strong className="total">
            Total: <span>{prod.length > 0 && total}$</span>
          </strong>
        </div>
      )}
    </div>
  );
}

export default CartPage;
