import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ProductsCollection from "../../../api/ProductsCollection";

function SearchDropDown({ searchValue, input, products, setState }) {
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleShow = useCallback(() => {
    if (document.activeElement === input.current) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    if (isFocused && searchValue.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isFocused, searchValue]);

  useEffect(() => {
    document.addEventListener("click", handleShow);

    return () => document.removeEventListener("click", handleShow);
  }, []);

  return (
    <div>
      {show && (
        <div className="searchDropDown">
          {products &&
            searchValue.length > 0 &&
            products.map((product) => (
              <div onClick={() => setState(product.title)} key={product._id}>
                {product.title}
              </div>
            ))}

          {searchValue && products && products.length <= 0 && (
            <span
              style={{
                display: "flex",
                flex: "1",
                justifyItems: "center",
                textAlign: "center",
                padding: "0 8px",
                textJustify: "center",
              }}
            >
              Couldn't find the product you wanted!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchDropDown;
