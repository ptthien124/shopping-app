import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions/product";
import { factoryInput, Input } from "../AdminPage";

function UpdateProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const [productId, setProductId] = useState("");
  const [idRequired, setIdRequired] = useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (productId === "") {
      console.log("product ID is required!");
      setIdRequired(true);
      return;
    }

    let numbPrice = "";
    if (price.trim() !== "") {
      numbPrice = Number(price);
    }

    dispatch(
      ACTIONS.UPDATE.REQUEST({
        productId: productId.trim(),
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        price: numbPrice,
      })
    );
  };

  useEffect(() => {
    if (!product.loading && product.type === "update") {
      setProductId("");
      setTitle("");
      setDescription("");
      setImage("");
      setPrice("");
    }
    if (!product.loading && product.error !== "") console.log(product.error);
  }, [product]);

  const inputs = [
    factoryInput("title", "Title", title, (e) => setTitle(e.target.value)),
    factoryInput("desc", "Description", description, (e) =>
      setDescription(e.target.value)
    ),
    factoryInput("image", "Image", image, (e) => setImage(e.target.value)),
    factoryInput("price", "Price", price, (e) => setPrice(e.target.value)),
  ];

  return (
    <form action="" className="form update" onSubmit={onSubmit}>
      <span>Update product</span>
      <Input
        inputId="productId"
        value={productId}
        onChange={(e) => {
          setProductId(e.target.value);
          setIdRequired(false);
        }}
        title="Product ID"
      />
      {idRequired && (
        <span
          style={{
            color: "var(--red)",
            margin: "0 0 0 auto",
            fontSize: "1.8rem",
          }}
        >
          Id is required!
        </span>
      )}

      {inputs.map((input) => (
        <Input
          key={input.inputId}
          inputId={input.inputId}
          title={input.title}
          value={input.value}
          onChange={input.onChange}
        />
      ))}

      {product.loading ? (
        <Spin style={{ marginTop: "10px" }} />
      ) : (
        <button type="submit">update</button>
      )}
    </form>
  );
}

export default UpdateProduct;
