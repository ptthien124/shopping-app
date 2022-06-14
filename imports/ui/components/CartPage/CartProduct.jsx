import React from "react";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../redux/actions/cart";
import "../../styles/css/cartProduct.css";

function CartProduct({
  _id,
  image,
  title,
  price,
  createAt,
  quantity = 1,
  userId,
}) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    const newCartProduct = {
      _id,
      image,
      title,
      price,
      quantity,
      createAt,
      userId,
    };
    dispatch(ACTIONS.ADD_TO_CART.REQUEST(newCartProduct));
  };

  const handleReduce = () => {
    dispatch(ACTIONS.REMOVE_FROM_CART.REQUEST({ _id, quantity, userId }));
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
