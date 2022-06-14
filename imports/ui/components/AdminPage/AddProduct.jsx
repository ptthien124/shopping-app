import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";

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

    Meteor.call("products.insert", {
      title: data.title,
      description: data.desc,
      image: data.image,
      price: numbPrice,
    });

    setTitle("");
    setDescription("");
    setImage("");
    setPrice("");
  };

  return (
    <form action="" className="form add" onSubmit={handleSubmit(onSubmit)}>
      <span>Add product</span>
      <Input
        inputId="add__title"
        title="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        register={{ ...register("add__title", { required: true }) }}
      />
      <Input
        inputId="add__desc"
        title="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        register={{ ...register("add__desc", { required: true }) }}
      />
      <Input
        inputId="add__image"
        title="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        register={{ ...register("add__image", { required: true }) }}
      />
      <Input
        inputId="add__price"
        title="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        register={{ ...register("add__price", { required: true }) }}
      />
      {/* <div className="inputWrapper">
        <label htmlFor="title">Title</label>
        
        <input
          name="title"
          id="title"
          type="text"
          {...register("title", { required: true })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div> */}
      {/* <div className="inputWrapper">
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
      </div> */}
      <button type="submit">add</button>
    </form>
  );
}

export default AddProduct;
