import { Modal, notification, Spin } from "antd";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductsCollection from "../../../api/ProductsCollection";
import { addToCart } from "../../redux/actions/cartAction";
import "../../styles/css/detailProduct.css";
import Button from "../Button";

function DetailProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams().id;
  const user = useSelector((state) => state.auth);

  const product = useTracker(() => {
    const products = Meteor.subscribe("products");
    if (products.ready()) {
      return ProductsCollection.find({ _id: params }).fetch()[0];
    }
    return {};
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openNotification = () => {
    notification.open({
      // message: "",
      description: `Add ${product.title} to your cart.`,
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
        _id: product._id,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
        createAt: product.createdAt,
        userId: user.userId,
      };
      dispatch(addToCart(newCartProduct));
      openNotification();
    } else {
      showModal();
    }
  };

  return (
    <div className="detailProduct">
      {product._id ? (
        <>
          <div className="img">
            <img src={product.image} />
          </div>
          <div className="container">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <strong>{product.price}$</strong>

            <div className="buttonContainer">
              <Button
                title="Add to cart"
                primary
                onClick={handleAddToCartClick}
              />
            </div>
          </div>
        </>
      ) : (
        <Spin
          style={{
            height: "500px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}

      <Modal
        title="Not logged in yet!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>You need to login before shopping.</p>
        <p>Ok to login.</p>
      </Modal>
    </div>
  );
}

export default DetailProduct;
