import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useRef, useState } from "react";
import ProductsCollection from "../../../api/ProductsCollection";
import useDebounce from "../../hooks/useDebounce";
import usePagination from "../../hooks/usePagination";
import "../../styles/css/productPage.css";
import Products from "./Products";

function ProductPage() {
  const products = useTracker(() => {
    const prods = Meteor.subscribe("products");
    if (prods.ready()) {
      return ProductsCollection.find().fetch();
    }
    return [];
  }, []);

  const searchInput = useRef();

  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const [debounced] = useDebounce(search, 700);
  const [filterList, setFilterList] = useState([]);

  const [next, prev, jump, currentData, currentPage, maxPage] = usePagination(
    debounced !== "" ? filterList : products,
    12
  );

  const sortOptionSelected = () => {
    const select = document.getElementById("productsPageSortSelect");
    const value = select.options[select.selectedIndex].value;
    setSort(value);
  };

  useEffect(() => {
    if (filterList.length > 0) jump(1);
  }, [filterList]);

  useEffect(() => {}, [debounced]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (search !== "") {
      const value = search.trim().toLowerCase();
      setFilterList([]);

      products.forEach((product) => {
        const title = product.title.toLowerCase();
        const index = title.indexOf(value);

        if (index !== -1) {
          setFilterList((prev) => [...prev, product]);
        }
      });
    }
  };

  //style pages button
  const currentPageStyles = (index) => {
    if (currentPage === index + 1) return { color: "var(--primary)" };
  };

  return (
    <div className="productPage">
      <div className="wrapper">
        <div className="searchWrapper grid wide">
          <div className="searchContainer">
            <button
              className="searchButton"
              onClick={() => searchInput.current.focus()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              className="search"
              placeholder="Search"
              ref={searchInput}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={onSubmit}
            />
          </div>
          <div className="sortWrapper">
            <span>Sort by</span>
            <select id="productsPageSortSelect" onChange={sortOptionSelected}>
              <option value="">--Sort--</option>
              <option value="price">Price</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        {(filterList.length > 0 || products.length > 0) && (
          <Products
            sortBy={sort}
            products={currentData}
            currentPage={currentPage}
          />
        )}

        {products.length <= 0 && (
          <div className="flex" style={{ height: "500px" }}>
            <Spin />
          </div>
        )}
        {(filterList.length > 0 || products.length > 0) && (
          <div className="flex">
            {/* <button onClick={() => prev()}>prev</button> */}
            {Array(maxPage)
              .fill()
              .map((_, index) => (
                <button
                  className="pageButton"
                  style={currentPageStyles(index)}
                  key={index}
                  onClick={() => jump(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            {/* <button onClick={() => next()}>next</button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
