import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions/product";
import { useEffect } from "react";
import { Spin } from "antd";

function RemoveProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [productId, setProductId] = useState("");

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(ACTIONS.REMOVE.REQUEST({ productId: productId }));
  };

  useEffect(() => {
    console.log(product);
    if (!product.loading && product.type === "remove") {
      setProductId("");
    }
    if (!product.loading && product.error !== "") console.log(product.error);
  }, [product]);

  return (
    <form action="" className="form remove" onSubmit={handleRemove}>
      <span>Remove product</span>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      {product.loading ? (
        <Spin style={{ marginTop: "10px" }} />
      ) : (
        <button type="submit">remove</button>
      )}
    </form>
  );
}

export default RemoveProduct;
