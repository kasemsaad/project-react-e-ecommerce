import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { changecart, changefavourit } from "../Store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../views/pagination";
import Footer from '../components/Footer';

function Shopping() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);
  const dispatch = useDispatch();
  const savedUserData = JSON.parse(localStorage.getItem("userData"));
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const countshop = (item, key) => {
    if (key === "cart") {
      let counter = JSON.parse(localStorage.getItem("cart") || "[]").length;
      dispatch(changecart(counter++));
    } else if (key === "favourit") {
      let counter = JSON.parse(localStorage.getItem("favourit") || "[]").length;
      dispatch(changefavourit(counter++));
    }
    Con(item, key);
  };

  const Con = (item, key) => {
    try {
      const parsedItem = JSON.parse(decodeURIComponent(item));
      let existingkey = JSON.parse(localStorage.getItem(key)) || [];
      const isItemInKey = existingkey.some(
        (keyItem) => keyItem.id === parsedItem.id
      );
      if (!isItemInKey) {
        existingkey.push(parsedItem);
        localStorage.setItem(key, JSON.stringify(existingkey));
      }
    } catch (error) {
      console.error("Error decoding URI component:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleAddToCartt = (product) => {
    if (savedUserData) {
      countshop(JSON.stringify(product), "cart");
      setSucessMessage("Add to Cart is Success");
      setTimeout(() => {
        setSucessMessage("");
      }, 3000);
    } else {
      setErrorMessage("Please login Account");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="w-100">
    <div
      className="card-container pt-5 pagination-container d-flex justify-content-center "
      style={{ textDecoration: "none" }}
    >
      <div className="search-container mb-3 w-50">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      <div className="row">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {sucessMessage && <Alert variant="success">{sucessMessage}</Alert>}
        {currentPosts.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card no-underline p-2 w-100">
              <Link
                to={`/getProduct/${product.id}`}
                className="no-underline text-dark"
              >
                <div width={2}>
                  <img
                    className="img"
                    src={product.images[0]}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "20px",
                    }}
                    alt={product.title}
                    width="100"
                  />
                </div>
                <h3>ID {product.id}</h3>
                <h3>{product.title}</h3>
                <div className=" text-danger p-2">
                  Price $<span>{product.price}</span>
                </div>
              </Link>
              <button
                className="btn"
                onClick={() => countshop(JSON.stringify(product), "favourit")}
              >
                <FontAwesomeIcon icon={faHeart} /> Add to Favorites
              </button>

              <button className="btn" onClick={() => handleAddToCartt(product)}>
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>

              <Link to={`/getProduct/${product.id}`} className="btn btn-dark">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPosts={filteredProducts.length}
        postsPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
<Footer/>
    </div>


  );
}

export default Shopping;
