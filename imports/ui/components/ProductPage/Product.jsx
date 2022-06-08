import { Col, notification } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import "../../styles/css/product.css";
import Button from "../Button";

function Product({ _id, image, title, price, createAt }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

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

  const handleAddToCartClick = () => {
    if (user.isLoggedIn) {
      const newCartProduct = {
        _id,
        image,
        title,
        price,
        quantity: 1,
        createAt,
        userId: user.userId,
        // createAt: new Date(),
      };
      dispatch(addToCart(newCartProduct));
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
      <div className="product">
        {showSkeleton && <div className="skeleton"></div>}
        <img src={image} alt="" onLoad={() => setShowSkeleton(false)} />
        <h3>{title}</h3>
        <strong>{price}$</strong>

        {user.isLoggedIn ? (
          <Button
            onClick={() => {
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
