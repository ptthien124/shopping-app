import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useRef, useState } from "react";
import { ProductsCollection } from "../../api/links";
import useDebounced from "../../customHooks/useDebounce";
import usePagination from "../../customHooks/usePagination";
import "../../styles/css/productPage.css";
import Header from "../Header";
import Products from "./Products";

function ProductPage() {
  const products = useTracker(() => ProductsCollection.find().fetch());

  const searchInput = useRef();

  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const [debounced] = useDebounced(search, 700);
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

  useEffect(() => {
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
  }, [debounced]);

  //style pages button
  const currentPageStyles = (index) => {
    if (currentPage === index + 1) return { color: "var(--primary)" };
  };

  return (
    <div className="productPage">
      <Header />

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
            />
          </div>
          <div className="sortWrapper">
            Sort by
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
