import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductsCollection from "../../../api/ProductsCollection";
import useDebounce from "../../hooks/useDebounce";
import "../../styles/css/productPage.css";
import Products from "./Products";
import SearchDropDown from "./SearchDropDown";

const PRODUCTS_PER_PAGE = 12;

function ProductPage() {
  const searchInput = useRef();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced] = useDebounce(search, 700);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterList, setFilterList] = useState([]);

  const sortOptionSelected = () => {
    const select = document.getElementById("productsPageSortSelect");
    const value = select.options[select.selectedIndex].value;
    setSort(value);
  };

  const prods = useTracker(() => {
    const temp = Meteor.subscribe("products");
    if (temp.ready()) {
      return ProductsCollection.find(
        {},
        {
          skip: (currentPage - 1) * PRODUCTS_PER_PAGE,
          limit: PRODUCTS_PER_PAGE,
        }
      ).fetch();
    }
    return [];
  }, [currentPage]);

  const filterProds = useTracker(() => {
    const temp = Meteor.subscribe("products");
    if (temp.ready()) {
      return ProductsCollection.find(
        { title: { $regex: search } },
        {
          limit: PRODUCTS_PER_PAGE,
        }
      ).fetch();
    }
    return [];
  }, [debounced]);

  const productsCount = useTracker(() => {
    const count = Meteor.subscribe("products");
    if (count.ready()) {
      return ProductsCollection.find().count();
    }
  }, []);

  useEffect(() => {
    setProducts(prods);
  }, [prods]);

  useEffect(() => {
    const title = search.trim();
    if (title.length > 0) {
      setFilterList([]);
      products.forEach((product) => {
        const index = title.indexOf(title);
        if (index !== -1) {
          setFilterList((prev) => [...prev, product]);
        }
      });
    }
  }, [debounced]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (search.trim() === "") {
        setProducts(prods);
        return;
      }

      setProducts(filterProds);
    },
    [search, filterProds]
  );

  // search drop down
  const dropDownClick = useCallback(
    (searchValue) => {
      setSearch(searchValue);
      if (searchValue.trim() === "") {
        setProducts(prods);
        return;
      }

      const value = searchValue.trim().toLowerCase();
      setProducts([]);

      prods.forEach((product) => {
        const title = product.title.toLowerCase();
        const index = title.indexOf(value);

        if (index !== -1) {
          setProducts((prev) => [...prev, product]);
        }
      });
    },
    [prods]
  );

  //style pages button
  const currentPageStyles = (index) => {
    if (currentPage === index + 1) return { color: "var(--primary)" };
  };

  return (
    <div className="productPage">
      <div className="wrapper">
        <div className="searchWrapper grid wide">
          <div className="searchContainer">
            <form className="searchForm" onSubmit={handleSubmit}>
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
            </form>
            <SearchDropDown
              searchValue={debounced}
              input={searchInput}
              products={filterProds}
              setState={dropDownClick}
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
          <Products sortBy={sort} products={products} />
        )}

        {products.length <= 0 && (
          <div className="flex" style={{ height: "500px" }}>
            <Spin />
          </div>
        )}
        {(filterList.length > 0 || products.length > 0) && (
          <div className="flex">
            {productsCount > 0 &&
              Array(Math.ceil(productsCount / PRODUCTS_PER_PAGE))
                .fill()
                .map((_, index) => (
                  <button
                    className="pageButton"
                    style={currentPageStyles(index)}
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
