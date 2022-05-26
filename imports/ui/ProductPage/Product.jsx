import { Col } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import "../../styles/css/product.css";
import Button from "../Button";

function Product({ _id, id, image, title, price, createAt }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const handleAddToCartClick = () => {
    const newCartProduct = {
      _id,
      id,
      image,
      title,
      price,
      quantity: 1,
      createAt,
      user: { ...user },
      // createAt: new Date(),
    };
    dispatch(addToCart(newCartProduct));
  };

  return (
    <Col
      style={{ marginBottom: "16px" }}
      xs={24}
      sm={12}
      md={8}
      lg={6}
      xl={6}
      xxl={4}
    >
      <div className="product">
        <img src={image} alt="" />
        <h3>{title}</h3>
        <strong>{price}$</strong>
        <Button
          onClick={handleAddToCartClick}
          primary
          width={"80%"}
          height={"40px"}
          title="Add to cart"
        ></Button>
      </div>
    </Col>
  );
}

export default Product;
