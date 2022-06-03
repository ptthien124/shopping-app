import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

function RemoveProduct() {
  const [productId, setProductId] = useState("");

  const handleRemove = (e) => {
    e.preventDefault();
    Meteor.call("products.remove", { productId: productId });

    setProductId("");
  };

  return (
    <form action="" className="form remove" onSubmit={handleRemove}>
      <span>Remove product</span>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button type="submit">remove</button>
    </form>
  );
}

export default RemoveProduct;
