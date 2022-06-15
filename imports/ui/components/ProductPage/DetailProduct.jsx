import { Modal, Spin } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components";
import { useFetch, useModal, useNotification } from "../../hooks";
import { ACTIONS } from "../../redux/actions/cart";
import "../../styles/css/detailProduct.css";

function DetailProduct() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams().id;
  const user = useSelector((state) => state.auth).userData;

  const filter = useMemo(() => ({ _id: params }), [params]);

  const { loading, list: product } = useFetch(filter, (findOne = true));

  // const product = useTracker(() => {
  //   const products = Meteor.subscribe("products");
  //   if (products.ready()) {
  //     return ProductsCollection.find({ _id: params }).fetch()[0];
  //   }
  //   return {};
  // }, []);

  useEffect(() => {
    if (!loading && (product === undefined || product.length === 0)) {
      history.push("/");
    }
  }, [product]);

  const [
    visible,
    confirmLoading,
    setVisible,
    setConfirmLoading,
    handleOk,
    handleCancel,
  ] = useModal();

  const showModal = () => {
    setVisible(true);
  };

  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const handleOk = () => {
  //   setIsModalVisible(false);
  //   history.push("/login");
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const [openNotification] = useNotification(product?.title);

  const handleAddToCartClick = () => {
    if (user?._id) {
      const newCartProduct = {
        _id: product._id,
        image: product.image,
        title: product.title,
        price: product.price,
        quantity: 1,
        createAt: product.createdAt,
        userId: user._id,
      };
      dispatch(ACTIONS.ADD_TO_CART.REQUEST(newCartProduct));
      openNotification();
    } else {
      showModal();
    }
  };

  return (
    <div className="detailProduct">
      {!loading ? (
        product && (
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
        )
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
        visible={visible}
        onOk={() => {
          handleOk();
          history.push("/login");
        }}
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
