import { Spin } from "antd";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";

function SearchDropDown({ value, input, handleSubmit, setSearch }) {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // fetch products
  const filter = useMemo(() => {
    return { title: { $regex: value, $options: "i" } };
  }, [value]);

  const { loading, list: products } = useFetch(filter);
  // const products = useTracker(() => {
  //   const temp = Meteor.subscribe("products");
  //   if (temp.ready()) {
  //     return ProductsCollection.find({
  //       title: { $regex: value, $options: "i" },
  //     }).fetch();
  //   }
  //   return [];
  // }, [value]);

  // show drop down
  const handleShow = () => {
    if (document.activeElement === input.current) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    if (isFocused && value.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isFocused, value]);

  useEffect(() => {
    document.addEventListener("click", handleShow);

    return () => document.removeEventListener("click", handleShow);
  }, []);

  return (
    <div>
      {show && (
        <div className="searchDropDown">
          {products &&
            value.length > 0 &&
            products.map((product) => (
              <div
                onClick={() => {
                  handleSubmit(product.title);
                  setSearch(product.title);
                }}
                key={product._id}
              >
                {product.title}
              </div>
            ))}

          {loading ? (
            <Spin />
          ) : (
            products.length === 0 && (
              <span
                style={{
                  display: "flex",
                  flex: "1",
                  justifyItems: "center",
                  textAlign: "center",
                  padding: "24px 8px",
                  textJustify: "center",
                }}
              >
                Couldn't find the product you wanted!
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SearchDropDown;
