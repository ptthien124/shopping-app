import { Col, Grid, Row, Spin } from "antd";
import "antd/dist/antd.css";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import ProductsCollection from "../../../api/ProductsCollection";
import Product from "./Product";

function Products({ sortBy, value, currentPage, productsPerPage }) {
  const [products, setProducts] = useState([]);

  const prods = useTracker(() => {
    setProducts([]);
    const subscribe = Meteor.subscribe("products");

    if (value.trim() === "") {
      if (subscribe.ready()) {
        return ProductsCollection.find(
          {},
          {
            skip: (currentPage - 1) * productsPerPage,
            limit: productsPerPage,
            createdAt: -1,
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
    setProducts([...prods]);

    if (sortBy === "price") {
      setProducts((prev) => [...prev.sort((a, b) => a.price - b.price)]);
    } else if (sortBy === "date") {
      setProducts((prev) => [
        ...prev.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      ]);
    }
  }, [sortBy, prods]);

  return (
    <div className="grid wide">
      {/*  <Col
      xs={24}
       sm={24}
       md={22}
       lg={22}
       xl={22}
       xxl={18}
       style={{ margin: "0 auto" }}
     > */}
      <Row gutter={16}>
        {products.map((product) => (
          <Product key={product._id} {...product} />
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
      {/* </Col> */}
    </div>
  );
}

export default Products;
