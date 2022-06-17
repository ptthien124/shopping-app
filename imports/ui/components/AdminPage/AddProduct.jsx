import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions/product";
import { factoryInput, Input } from "../AdminPage";

function AddProduct() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

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

    dispatch(
      ACTIONS.ADD.REQUEST({
        title: data.title,
        description: data.desc,
        image: data.image,
        price: numbPrice,
      })
    );
  };

  useEffect(() => {
    if (!product.loading && product.type === "add") {
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
    <form action="" className="form add" onSubmit={handleSubmit(onSubmit)}>
      <span>Add product</span>
      {inputs.map((input) => (
        <Input
          key={input.inputId}
          inputId={input.inputId}
          title={input.title}
          register={register}
          value={input.value}
          onChange={input.onChange}
        />
      ))}

      {product.loading ? (
        <Spin style={{ marginTop: "10px" }} />
      ) : (
        <button type="submit">add</button>
      )}
    </form>
  );
}

export default AddProduct;
