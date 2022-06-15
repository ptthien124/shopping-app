import { Row, Spin } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks";
import { Product } from "../ProductPage";

function Products({ sortBy, value, currentPage, productsPerPage }) {
  const auth = useSelector((state) => state.auth).userData;
  const [products, setProducts] = useState([]);

  //
  const filter = useMemo(() => {
    if (value.trim === "") return {};
    return { title: { $regex: value, $options: "i" } };
  }, [value, currentPage]);

  const skip = useMemo(() => {
    if (value.trim === "") return (skip = (currentPage - 1) * productsPerPage);
    return (currentPage - 1) * productsPerPage;
  }, [value, currentPage]);

  const { loading, list: prods } = useFetch(
    filter,
    (findOne = false),
    skip,
    (limit = productsPerPage)
  );
  //

  // const prods = useTracker(() => {
  //   setProducts([]);
  //   const subscribe = Meteor.subscribe("products");

  //   if (value.trim() === "") {
  //     if (subscribe.ready()) {
  //       return ProductsCollection.find(
  //         {},
  //         {
  //           skip: (currentPage - 1) * productsPerPage,
  //           limit: productsPerPage,
  //           createdAt: -1,
  //         }
  //       ).fetch();
  //     }
  //     return [];
  //   }

  //   if (subscribe.ready()) {
  //     return ProductsCollection.find(
  //       { title: { $regex: value, $options: "i" } },
  //       {
  //         skip: (currentPage - 1) * productsPerPage,
  //         limit: productsPerPage,
  //       }
  //     ).fetch();
  //   }

  //   return [];
  // }, [value, currentPage]);

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
      <Row gutter={16}>
        {products.map((product) => (
          <Product
            key={product._id}
            {...product}
            userId={auth._id || undefined}
          />
        ))}
      </Row>

      {loading && (
        <div className="flex" style={{ height: "500px" }}>
          <Spin />
        </div>
      )}

      {products.length === 0 && !loading && (
        <div className="flex" style={{ height: "500px" }}>
          <span style={{ fontSize: "3rem" }}>
            Couldn't find the product you wanted!
          </span>
        </div>
      )}
    </div>
  );
}

export default Products;
