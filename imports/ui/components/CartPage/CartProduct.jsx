import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/actions/cartAction";
import "../../../styles/css/cartProduct.css";

function CartProduct({ _id, image, title, price, createAt, quantity = 1 }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleIncrease = () => {
    const newCartProduct = {
      _id,
      image,
      title,
      price,
      quantity,
      createAt,
      userId: user.userId,
    };
    dispatch(addToCart(newCartProduct));
  };

  const handleReduce = () => {
    dispatch(removeFromCart({ _id, quantity, userId: user.userId }));
  };

  return (
    <div className="cartProduct">
      <img src={image} alt="" />
      <div className="container">
        <h3>{title}</h3>
        <strong>{price}$</strong>
      </div>
      <div className="quantity">
        <p>
          Quantity: <span>{quantity}</span>
        </p>

        <div className="actions">
          <button onClick={handleReduce}>-</button>
          <button onClick={handleIncrease}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
