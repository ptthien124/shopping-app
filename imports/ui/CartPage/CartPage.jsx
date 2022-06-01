import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/css/cartPage.css";
import CartProducts from "./CartProducts";
import Empty from "./Empty";

function CartPage() {
  const [prod, setProd] = useState([]);
  const cartList = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    const list = cartList.filter((item) => item.userId === user.userId);
    setProd(list);
  }, [cartList]);

  const round = useCallback(
    (value, decimals) =>
      Number(Math.round(value + "e" + decimals) + "e-" + decimals),
    []
  );

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
            Total:{" "}
            <span>
              {prod.length > 0 &&
                round(
                  prod.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  ),
                  2
                )}
              $
            </span>
          </strong>
        </div>
      )}
    </div>
  );
}

export default CartPage;
