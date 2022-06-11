import { Col, notification } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ACTIONS } from "../../redux/actions/cart";
// import { addToCart } from "../../redux/actions/cart";
import "../../styles/css/product.css";
import Button from "../Button";

function Product({ _id, image, title, price, createdAt, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showSkeleton, setShowSkeleton] = useState(true);

  const openNotification = () => {
    notification.open({
      // message: "",
      description: `Add ${title} to your cart.`,
      className: "custom-class",
      style: {
        width: 300,
      },
      duration: 2.5,
    });
  };

  const handleAddToCartClick = (e) => {
    if (userId) {
      const newCartProduct = {
        _id,
        image,
        title,
        price,
        quantity: 1,
        createdAt,
        userId,
        // createAt: new Date(),
      };
      dispatch(ACTIONS.ADD_TO_CART.REQUEST(newCartProduct));
    }
  };

  return (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xl={6}
      xxl={4}
      style={{ marginBottom: "16px" }}
    >
      <div className="product" onClick={() => history.push(`/${_id}`)}>
        {showSkeleton && <div className="skeleton"></div>}
        <img src={image} alt="" onLoad={() => setShowSkeleton(false)} />
        <h3>{title}</h3>
        <strong>{price}$</strong>

        {userId ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCartClick();
              openNotification();
            }}
            primary
            width={"80%"}
            height={"40px"}
            title="Add to cart"
          ></Button>
        ) : (
          <div style={{ height: "40px" }}></div>
        )}
      </div>
    </Col>
  );
}

export default Product;
