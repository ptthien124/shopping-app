import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useForm } from "react-hook-form";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const numbPrice = Number(data.price);
    console.log({
      title: data.title,
      description: data.desc,
      image: data.image,
      price: numbPrice,
    });
    // Meteor.call("products.insert", {
    //   title: data.title,
    //   description: data.desc,
    //   image: data.image,
    //   price: numbPrice,
    // });
  };

  return (
    <form className="form add" onSubmit={handleSubmit(onSubmit)}>
      <span>Add product</span>
      <div className="inputWrapper">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          {...register("title", { required: true })}
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
          {...register("desc", { required: true })}
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
          {...register("image", { required: true })}
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
          {...register("price", { required: true })}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button>add</button>
    </form>
  );
}

export default AddProduct;
