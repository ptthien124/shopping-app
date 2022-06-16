import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useEffect, useRef, useState } from "react";
import ProductsCollection from "../../../api/ProductsCollection";
import { useDebounce } from "../../hooks";
import "../../styles/css/productPage.css";
import { Products, SearchDropDown } from "../ProductPage";

const PRODUCTS_PER_PAGE = 12;

function ProductPage() {
  const searchRef = useRef();

  const [search, setSearch] = useState("");
  const [submitSearch, setSubmitSearch] = useState("");
  const debounced = useDebounce(search, 700);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsCount = useTracker(() => {
    const count = Meteor.subscribe("products");
    if (count.ready()) {
      if (submitSearch.trim() === "") {
        return ProductsCollection.find().count();
      }
      return ProductsCollection.find({
        title: { $regex: submitSearch },
      }).count();
    }
  }, [submitSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [productsCount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitSearch(search.trim());
    setSearch("");
  };

  const sortOptionSelected = () => {
    const select = document.getElementById("productsPageSortSelect");
    const value = select.options[select.selectedIndex].value;
    setSort(value);
  };

  const currentPageButtonStyles = (index) => {
    if (currentPage === index + 1) return { color: "var(--primary)" };
  };

  const handleSearchBtn = () => {
    if (search.trim() === "") {
      searchRef.current.focus();
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="productPage">
      <div className="wrapper">
        <div className="searchWrapper grid wide">
          <div className="searchContainer">
            <form className="searchForm" onSubmit={handleSubmit}>
              <button className="searchButton" onClick={handleSearchBtn}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              <input
                className="search"
                placeholder="Search"
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <SearchDropDown
              value={debounced.trim()}
              input={searchRef}
              handleSubmit={setSubmitSearch}
              setSearch={setSearch}
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

        <Products
          sortBy={sort}
          currentPage={currentPage}
          value={submitSearch}
          productsPerPage={PRODUCTS_PER_PAGE}
        />

        <div className="flex">
          {productsCount > 0 &&
            Array(Math.ceil(productsCount / PRODUCTS_PER_PAGE))
              .fill()
              .map((_, index) => (
                <button
                  className="pageButton"
                  style={currentPageButtonStyles(index)}
                  key={index}
                  onClick={() => {
                    setCurrentPage(index + 1);
                    window.scrollTo(0, 0);
                  }}
                >
                  {index + 1}
                </button>
              ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
