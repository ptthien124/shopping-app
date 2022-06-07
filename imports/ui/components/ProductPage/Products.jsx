import { Row } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import Product from "./Product";

function Products({ sortBy, products }) {
  const [prod, setProd] = useState(products);
  const [defaultProd, setDefaultProd] = useState(products);

  useEffect(() => {
    setProd(products);
    setDefaultProd(products);
  }, [products]);

  useEffect(() => {
    if (sortBy === "price") {
      setProd((prev) => [...prev.sort((a, b) => a.price - b.price)]);
    } else if (sortBy === "date") {
      setProd((prev) => [
        ...prev.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)),
      ]);
    } else {
      setProd([...defaultProd]);
    }
  }, [sortBy]);

  return (
    <div className="grid wide">
      <Row gutter={16}>
        {prod.map((item) => (
          <Product key={item._id} {...item} />
        ))}
      </Row>
    </div>
  );
}

export default Products;
