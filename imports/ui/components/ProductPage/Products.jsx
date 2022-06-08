import { Row, Spin } from "antd";
import "antd/dist/antd.css";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useEffect, useState } from "react";
import ProductsCollection from "../../../api/ProductsCollection";
import Product from "./Product";

function Products({ sortBy, value, currentPage, productsPerPage }) {
  const [products, setProducts] = useState([]);

  const prods = useTracker(() => {
    const subscribe = Meteor.subscribe("products");

    if (value.trim() === "") {
      if (subscribe.ready()) {
        return ProductsCollection.find(
          {},
          {
            skip: (currentPage - 1) * productsPerPage,
            limit: productsPerPage,
          }
        ).fetch();
      }
      return [];
    }

    if (subscribe.ready()) {
      return ProductsCollection.find(
        { title: { $regex: value, $options: "i" } },
        {
          skip: (currentPage - 1) * productsPerPage,
          limit: productsPerPage,
        }
      ).fetch();
    }

    return [];
  }, [value, currentPage]);

  useEffect(() => {
    setProducts(prods);

    if (sortBy === "price") {
      setProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
    } else if (sortBy === "date") {
      setProducts((prev) => [
        ...prev.sort((a, b) => new Date(b.createAt) - new Date(a.createAt)),
      ]);
    }
  }, [sortBy, prods]);

  return (
    <div className="grid wide">
      <Row gutter={16}>
        {products.map((item) => (
          <Product key={item._id} {...item} />
        ))}
      </Row>

      {products.length === 0 && (
        <div className="flex" style={{ height: "500px" }}>
          {value.trim() === "" ? (
            <Spin />
          ) : (
            <span style={{ fontSize: "3rem" }}>
              Couldn't find the product you wanted!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
