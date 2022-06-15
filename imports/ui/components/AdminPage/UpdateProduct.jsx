import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Input } from "../AdminPage";

function UpdateProduct() {
  const [productId, setProductId] = useState("");
  const [idRequired, setIdRequired] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

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

    Meteor.call("products.update", {
      productId: productId.trim(),
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      price: numbPrice,
    });

    setProductId("");
    setTitle("");
    setDescription("");
    setImage("");
    setPrice("");
  };

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

      <Input
        inputId="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        title="Title"
      />
      <Input
        inputId="desc"
        title="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        inputId="image"
        title="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Input
        inputId="price"
        title="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {/* <div className="inputWrapper">
        <label htmlFor="productId">Product ID</label>
        <input
          name="productId"
          id="productId"
          type="text"
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            setIdRequired(false);
          }}
        />
      </div> */}
      {/* <div className="inputWrapper">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="desc">Description</label>
        <input
          id="desc"
          name="desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          name="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="inputWrapper">
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div> */}
      <button type="submit">update</button>
    </form>
  );
}

export default UpdateProduct;
